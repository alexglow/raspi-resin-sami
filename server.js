function getTimeMillis(){return parseInt(Date.now().toString())}

function start(){
	isWebSocketReady=!1,ws=new WebSocket(webSocketUrl),ws.on("open",function(){
		console.log("Websocket connection is open ...."),register()}
	),ws.on("message",function(e){
		console.log("Received message: "+e+"\n")}
	),ws.on("close",function(){
		console.log("Websocket connection is closed ....")}
	)}
	
function register(){console.log("Registering device on the websocket connection");try{
	var e='{
		"type":"register", "sdid":"'+device_id+'", "Authorization":"bearer '+device_token+'", "cid":"'+getTimeMillis()+'"}
	';console.log("Sending register message "+e+"\n"),ws.send(e,{
		mask:!0}),isWebSocketReady=!0}
	catch(o){
		console.error("Failed to register messages. Error in registering message: "+o.toString())}
	}
	
function sendData(e){
	try{
		ts=', "ts": '+getTimeMillis();var o={
			onFire:e}
		,s='{
			"sdid":"'+device_id+'"'+ts+', "text":"Yo!", "cid":"'+getTimeMillis()+'"}
		';console.log("Sending payload "+s),ws.send(s,{
			mask:!0}
		)}	
	catch(i){
		console.error("Error in sending a message: "+i.toString())
	}
}

var webSocketUrl="wss://api.samsungsami.io/v1.1/websocket?ack=true",
device_id="7b22cdc926244872a2e92f0028be106d",
device_token="3d00fb9767cb4a26a859ab636a465c23",
isWebSocketReady=!1,
ws=null,
WebSocket=require("ws");

start(),
sp.on("open",function(){
	sp.on("data",function(e){
		if(!isWebSocketReady)return void console.log("Websocket is not ready. Skip sending data to SAMI (data:"+e+")");console.log("Serial port received data:"+e);var o=parseInt(e),s=!1;0==o&&(s=!0),sendData(s)}
	)}
);