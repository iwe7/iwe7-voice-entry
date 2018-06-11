<?php
global $_W,$_GPC;
require_once IA_ROOT.'/addons/runner_open/open/baidu/AipSpeech.php';
const APP_ID = '9872937';
const API_KEY = 'nRx1uWtoc9bGI2eyjvStrz2p';
const SECRET_KEY = 'xg1bwZUGgi2ikNLUN4nvBfcufEgfSalj';
$client = new AipSpeech(APP_ID, API_KEY, SECRET_KEY);
$temp = $_FILES['file']['tmp_name'];
$result = $client->asr(file_get_contents($temp), 'pcm', 16000, array(
    'dev_pid' => 1537,
));
meepoSuccess('',$result);