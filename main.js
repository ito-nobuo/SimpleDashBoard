/**
 * @file main.js
 * 
 * @brief Electron起動用mainシーケンス
 * 
 * @author Nobuo Ito
 * 
 * @date 2017/05/08<br>
 *        新規作成
 */

'use strict';

/*********************
 *     変数宣言
 *********************/
// アプリケーションをコントロールするモジュール
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow;

/************************
 *   ウィンドウの処理
 ************************/
// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  webPreferences: {
    nodeIntegration: false
  }
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  //ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});