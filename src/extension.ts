// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { error } from 'console';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const execAsync = promisify(exec);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	try {
		const { stdout, stderr } = await execAsync('java -version');
		const output = stdout.toString() || stderr.toString();
		const javaVersion = output.split('\n')[0];
		const message = `RACK is initialized with ${javaVersion}`;

		vscode.window.showInformationMessage(message);
	} catch (e) {
		vscode.window.showErrorMessage('To use RACK you need to install JAVA and add it to PATH environment variable');
	}
	console.log('Congratulations, your extension "rack" is now active!');

	async function generateQuery(): Promise<void> {
		try {
			const query = await vscode.window.showInputBox({
				prompt: 'Your search query'
			});
			if (!query) {
				return;
			}

			vscode.window.showInformationMessage('Generating your API suggestions');

			const filePath = 'rack-exec.jar';
			const cwd = __dirname;

			const cmd = `java -jar ${filePath} -K 10 -task suggestAPI -query "${query}"`;
			const { stdout, stderr } = await execAsync(cmd, { cwd: __dirname });

			// first line of stderr will be "Reading POS tagger model"
			// if there is any more line, then it is an error
			if (stderr.split('\n')[1]) {
				vscode.window.showErrorMessage('An error occured during generating API suggestions');
				return;
			}
			const suggestions = stdout.split('\n')
				.map((suggestion) => suggestion.trim())
				.filter(Boolean);
			if (suggestions.length === 1) {
				vscode.window.showWarningMessage('Use a more specific query');
				return generateQuery();
			}
			suggestions[0] = 'All';
			vscode.window.showInformationMessage(suggestions.join());
		} catch (err) {
			console.error(err);
		}
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('rack.rack', async () => {
		// The code you place here will be executed every time your command is executed

		await generateQuery();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
