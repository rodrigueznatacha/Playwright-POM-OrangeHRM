/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestError, TestResult, TestStep } from '@playwright/test/reporter';
import * as dotenv from 'dotenv';

dotenv.config();

type TestAttr = {
	testID: string;
	testNumber: number;
	testName: string;
	testStatus?: string;
	testDuration?: number;
};

class MyReporter implements Reporter {
	private startTime: number;
	private endTime: number;
	private testResults: TestAttr[];
	private retryCount: number;
	private totalRetries: number;
	private runningTests: TestCase[];
	private parallelTests: boolean;
	private totalTests: number;

	constructor() {
		this.startTime = 0;
		this.endTime = 0;
		this.testResults = [];
		this.retryCount = 0;
		this.totalTests = 0;
		this.totalRetries = 0;
		this.runningTests = [];
		this.parallelTests = false;
	}

	onBegin(config: FullConfig, suite: Suite) {
		if (process.env.CI) console.log('\x1b[33m%s\x1b[0m', '🧩 Running in CI...');
		this.startTime = Date.now();
		this.totalTests = suite.allTests().length;
		this.parallelTests = config.workers > 1;
		
		this.runningTests = suite.allTests();
		const usedWorkers = config.workers === 1 ? '1 worker' : `${config.workers} workers`;
		
		console.log('\n', `🎬 Total Tests to Run: ${this.totalTests} TC using ${usedWorkers}`);
		
		if (suite.suites.length > 0) {
			const projectNames = suite.suites.map(({ title }) => title).join(', ');
			console.log('\x1b[32m%s\x1b[0m', `🚀 Starting Test Execution in ${projectNames.toUpperCase()}...`);
		}
	}

	onTestBegin(test: TestCase) {
		this.totalRetries = test.retries;
		const runningTestCase = this.runningTests.find(({ id }) => id === test.id);
		if (!runningTestCase) return; // Safety check

		const testNumber = this.runningTests.indexOf(runningTestCase) + 1;
		
		// Worker info calculation
		let testWorker = '';
		// Note: test.results might be empty at start, so we check carefully
		if (this.parallelTests && test.results.length > 0) {
			testWorker = ` (worker: ${test.results[0].workerIndex + 1})`;
		}

		if (test.expectedStatus === 'skipped') {
			console.log('\n\x1b[90m%s\x1b[0m', `🔧${testWorker} Skipped Test [${testNumber}/${this.totalTests}] => ${test.title}`);
		} else {
			const currentRetry = test.results.length > 0 ? test.results[0].retry : 0;
			if (currentRetry === 0) {
				console.log('\n\x1b[34m%s\x1b[0m', `🧪${testWorker} Running Test [${testNumber}/${this.totalTests}] => ${test.title}`);
			} else {
				console.log('\n\x1b[34m%s\x1b[0m', `🧪${testWorker} Running Test [${testNumber}/${this.totalTests}] => ${test.title}`, `💫 Retry #${currentRetry}`);
			}
		}

		const testData: TestAttr = {
			testID: test.id,
			testNumber: testNumber,
			testName: test.title
		};
		this.testResults.push(testData);
	}

	onStepBegin(test: TestCase, _result: TestResult, step: TestStep) {
		// Optional: Filter only high-level steps to avoid noise
		if (step.category === 'test.step') {
			const testNameSuffix = this.parallelTests ? ` -- ${test.title}` : '';
			console.group();
			console.log('\x1b[37m%s\x1b[0m', `---- ➤ ${step.title}${testNameSuffix}`);
		}
	}

	onStepEnd(test: TestCase, _result: TestResult, step: TestStep) {
		if (step.category === 'test.step') {
			const testNameSuffix = this.parallelTests ? ` -- ${test.title}` : '';
			
			if (step.error) {
				console.log('\x1b[31m%s\x1b[0m', `---- step failed 🔴 [${step.duration}ms]${testNameSuffix}`);
				if (step.error.message) console.log('\x1b[31m%s\x1b[0m', '---- 🔴 Error:', step.error.message);
			} else {
				console.log('\x1b[32m%s\x1b[0m', `---- step passed ✅ [${step.duration}ms]${testNameSuffix}`);
			}
			console.groupEnd();
		}
	}

	onTestEnd(test: TestCase, result: TestResult) {
		const testRun = this.testResults.find(({ testID }) => testID === test.id);
		if (!testRun) return;

		const testRunNumber = `[${testRun.testNumber}/${this.totalTests}]`;
		const testName = this.parallelTests ? ` -- ${testRunNumber} ${test.title}` : '';
		
		console.group();
		
		if (result.status === 'passed') {
			console.log('\x1b[32m%s\x1b[0m', `---- 🔎 Test Output: ✅ PASSED${testName}`);
			this.retryCount = 0;
		} else if (result.status === 'failed' || result.status === 'timedOut') {
			const icon = result.status === 'timedOut' ? '⏱️ TimedOut' : '❌ FAILED';
			console.log('\x1b[31m%s\x1b[0m', `---- 🔎 Test Output: ${icon}${testName}`);
			
			if (result.error?.message) console.log('\x1b[31m%s\x1b[0m', '---- 🔴 Error:', result.error.message);
			if (result.error?.location) console.log('\x1b[31m%s\x1b[0m', '---- 🔎 Located in:', `${result.error.location.file}:${result.error.location.line}`);
			
			this.retryCount = result.retry + 1;
			if (this.retryCount > this.totalRetries) this.retryCount = 0;
		} else if (result.status === 'interrupted') {
			console.log('\x1b[31m%s\x1b[0m', `---- 🔎 Test Output: ⚠️ INTERRUPTED${testName}`);
		} else if (result.status === 'skipped') {
             console.log('\x1b[90m%s\x1b[0m', `---- 🔎 Test Output: ⏭️ SKIPPED${testName}`);
        }

		console.groupEnd();
		
		// Update testData safely
		const index = this.testResults.indexOf(testRun);
		if (index !== -1) {
			this.testResults[index].testStatus = result.status;
			this.testResults[index].testDuration = result.duration;
		}
	}

	onError(error: TestError): void {
		console.group();
		console.log('\x1b[31m%s\x1b[0m', '---- 🔴 Global Error:', error.message);
		if (error.stack) console.log('\x1b[31m%s\x1b[0m', error.stack);
		console.groupEnd();
	}

	onEnd(result: FullResult) {
		this.endTime = Date.now();
		const totalDurationSeconds = (this.endTime - this.startTime) / 1000;
		
		console.log('\n\x1b[43m\x1b[30m%s\x1b[0m', '📊 TEST REPORT SUMMARY:', '\n');
		console.group();

		this.testResults.forEach(test => {
			if (test.testDuration === undefined) return;
			
			// ✅ FIX: Calculamos segundos correctamente (ms / 1000)
			const durationSeconds = test.testDuration / 1000;
			const durationString = `${durationSeconds.toFixed(2)}s`;

			let icon = 'Nj';
			let colorCode = '\x1b[37m'; // White by default

			switch (test.testStatus) {
				case 'passed':
					icon = '✅';
					colorCode = '\x1b[32m'; // Green
					break;
				case 'failed':
					icon = '❌';
					colorCode = '\x1b[31m'; // Red
					break;
				case 'timedOut':
					icon = '⌛';
					colorCode = '\x1b[31m'; // Red
					break;
				case 'skipped':
					icon = '⏭️';
					colorCode = '\x1b[90m'; // Grey
					break;
				case 'interrupted':
					icon = '⚠️';
					colorCode = '\x1b[33m'; // Yellow
					break;
			}

			console.log(colorCode + '%s\x1b[0m', `${test.testStatus?.toUpperCase()} ${icon} [${test.testNumber}] 🧪 ${test.testName} (${durationString})`);
		});

		console.groupEnd();
		console.log('\n\x1b[1m\x1b[0m', `⏰ Test Execution Ended in ${totalDurationSeconds.toFixed(2)} seconds.`);

		// Overall Status Output
		const statusIcons: Record<string, string> = {
			passed: '✅ ALL TESTS PASSED',
			failed: '🔴 EXECUTION FAILED',
			timedout: '⏱️ TIMEDOUT',
			interrupted: '⚠️ INTERRUPTED'
		};

		const statusMessage = statusIcons[result.status] || `UNKNOWN STATUS: ${result.status}`;
		const backgroundColor = result.status === 'passed' ? '\x1b[102m' : '\x1b[41m'; // Green BG or Red BG
		const textColor = '\x1b[30m\x1b[1m'; // Black bold text

		console.log(`\n🚀 Overall Output: ${backgroundColor}${textColor} ${statusMessage} \x1b[0m\n`);
	}
}

export default MyReporter;