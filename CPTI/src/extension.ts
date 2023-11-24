// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs from "fs";
import path from "path";
// const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "CPTI" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let foo = vscode.commands.registerCommand('CPTI.copy_template', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		var workspace_configs = vscode.workspace.getConfiguration();
		var tpath = workspace_configs.get("cpti.path_to_template");

		if (tpath == null || !fs.existsSync(tpath as string)) {
			vscode.window.showInformationMessage("Please go to the setting to set the absolute to your CP templates.");
			return;
		}

		var files = fs.readdirSync(tpath as string, {withFileTypes: true})
		.filter(item => !item.isDirectory())
		.map(file => file.name);
		// .map(file => path.parse(file.name).name);
		// console.log(files);
		// files.forEach(file => {
		// 	file = path.parse(file).name;
		// 	return file;
		// });
		// console.log(files);

		vscode.window.showQuickPick(files).then(selectedString => {
			if (selectedString) {
				const fileContent = fs.readFileSync(tpath + selectedString, 'utf-8');
				vscode.env.clipboard.writeText(fileContent);
				// // If a string is selected, show an input box
				// vscode.window.showInputBox({
				// 	placeHolder: `Enter value for ${selectedString}`
				// }).then(userInput => {
					
				// });
			}
		});
	});

	context.subscriptions.push(foo);
}

// This method is called when your extension is deactivated
export function deactivate() {}
