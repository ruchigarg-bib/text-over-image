var $ = require('jquery');
var blockSdk = require('blocksdk');

var sdk = new SDK(); 

function saveContent(imgUrl){
	sdk.getData(function(data){
		
		console.log("Inside SaveText - Data:"+JSON.stringify(data, null, 2));
		
		function updateObject(keyVal, valVal){
			var numberOfEdits = data.numberOfEdits || 0;
			if(!data.dataArray){
				console.log("Causing Trouble!!");
			}else {
				  data.dataArray.image = imgUrl;
				  console.log("Adding new values:"+JSON.stringify(data, null, 2));
			}
			
			sdk.setData({
				numberOfEdits :numberOfEdits + 1,
				dataArray: data.dataArray
			})
			
			console.log("Inside Update Object:" + JSON.stringify(data, null, 2));
		}
		updateObject(imgUrl);
		
		Console.log("After SaveText setData:"+JSON.stringify(data.dataArray, null, 2));
		
		$("currentResponse").html(JSON.stringify(data, null, 2));
	});
	
	sdk.getContent(function(content){
		
		console.log("Inside SaveCOntent:"+JSON.stringify(content, null, 2));
		
		var imageHTML = '<img src="'+imgUrl+'" style="width:600px; height:300px;display:block;margin:0 auto;"/>' ;
		
		content = imageHTML;
		
		sdk.setContent(content, function(setContent){
			
			console.log("setContent:"+JSON.stringify(setContent, null, 2));
		});
	});
}

//On New ImageURL , Save new Content
$("#image").change(function(){
	$("#showImage").html('<img src="'+$(this).val()+'" style="width=600px;"/>');
	saveContent($(this).val());
})

sdk.getData(function(data){
	var numberOfEdits = data.numberOfEdits || 0;
	console.log(JSON.stringify(numberOfEdits, null, 2));
	
	var htmlCode = '<table border="0" cellpadding="0" cellspacing="0" width="100%">'+'<tr>'+
	'<td background="'+ data.dataArray.image +'" height="300">'+
	'</td>'+'</tr>'+'</table>';
	
	if(numberOfEdits == 0){
		sdk.setData({
			numberOfEdits: numberOfEdits + 1,
			dataArray: {"imgURL": "0"}
		})
	}else{
		$("#showImage").html(htmlCode);
		$("#image").val(data.dataArray.image);
		$("currentResponse").html(JSON.stringify(data, null, 2));
		
	}
	console.log(JSON.stringify(data.dataArray, null, 2));
	
	/*imgURL = data.imgURL || '';
	imgText = data.imgText || '';
	imgHeight = data.imgHeight || 300;
	imgWidth = data.imgWidth || 600;
	restoreDefaultValue();
	createImageoverTextBlock();*/
})



