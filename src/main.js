require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var $ = require("jquery");
var blockSdk = require('blocksdk');

var sdk = new blockSdk(); 

var imgWidth, imgHeight;

function saveContent(imgUrl,imgWidth, imgHeight, imgText, txtPosition, txtColor){
	debugger;
	console.log("Inside SaveContent:imgWidth:"+imgWidth+"imgHeight:"+imgHeight+"imgText:"+imgText);
	sdk.getData(function(data){
		
		console.log("Inside SaveText - Data:"+JSON.stringify(data, null, 2));
		
		function updateObject(imgUrl, imgWidth, imgHeight, imgText, txtPosition, txtColor){
			var numberOfEdits = data.numberOfEdits || 0;
			if(!data.dataArray){
				console.log("Causing Trouble!!");
			}else {
				  data.dataArray.image = imgUrl;
				  data.dataArray.imgWidth = imgWidth;
				  data.dataArray.imgHeight = imgHeight;
				  data.dataArray.imgText = imgText;
				  data.dataArray.txtPosition = txtPosition;
				  data.dataArray.txtColor = txtColor;
				  console.log("Adding new values:"+JSON.stringify(data, null, 2));
			}
			
			sdk.setData({
				numberOfEdits :numberOfEdits + 1,
				dataArray: data.dataArray
			})
			
			console.log("Inside Update Object:" + JSON.stringify(data, null, 2));
		}
		updateObject(imgUrl,imgWidth, imgHeight, imgText, txtPosition, txtColor);
		//imgWidth = $('imgWidth').val();
		//imgHeight = $('imgHeight').val();
			
		
		console.log("After SaveText setData:"+JSON.stringify(data.dataArray, null, 2));
		
		$("currentResponse").html(JSON.stringify(data, null, 2));
	});
	
	sdk.getContent(function(content){
		
		console.log("Inside SaveCOntent:"+JSON.stringify(content, null, 2));
		//console.log ("imgwidth:"+  content.dataArray.imgWidth);
		//console.log("Img Height:" + content.dataArray.imgHeight);

		//var htmlCode1 = '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td background="'+imgUrl+'" height="'+imgHeight+'" width="'+ imgWidth+'"></td></tr></table>';
		//var imageHTML = '<img src="'+ imgUrl +'" width = "'+ imgWidth  +'" height = "'+ imgHeight +'"/>' ;
		//var htmlCode = '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td background= "'+ imgUrl +'" style="background-size: "'+ imgWidth+'" "'+imgHeight+'"; background-image: url("'+ imgUrl +'" );" ></td></tr></table>';
		var htmlCode = '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td background= "'+ imgUrl +'" height= "'+imgHeight+'" width= "'+ imgWidth+'" style="background-size:100%; background-repeat:no-repeat;" ><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="right" style="font-size: 0%;" valign="top" width="20"></td><td align="right"  valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="right" style="padding-top: 95px;" valign="top"><span  style="color: '+ txtColor+'; text-align:'+ txtPosition+'; font-size:18px; padding:0px 0px;display:block;width:400px;word-wrap:break"><b> '+imgText+' </b></span></td></tr><tr><td align="left"  style="padding-top: 95px;" valign="top"></td></tr></table></td><td align="left"  style="font-size: 0%;" valign="top" width="20"></td></tr></table></td></tr></table>';
		
		content = htmlCode;
		//content = imageHTML;
		
		sdk.setContent(content, function(setContent){
			
			console.log("setContent:"+JSON.stringify(setContent, null, 2));
		});
	});
}

function updateSliderValues () {
	document.getElementById('slider-id-01-val').innerHTML = document.getElementById('imgWidth').value;
	document.getElementById('slider-id-02-val').innerHTML = document.getElementById('imgHeight').value;
}

//On New ImageURL , Save new Content
/*$("#image").on('change',function(){
	var imgSrc = $(this).val();
	var imgWidth = $('#imgWidth').val();
	var imgHeight = $('#imgHeight').val();
	$("#showImage").html('<img src="'+ imgSrc +'" width = "'+ imgWidth  +'" height = "'+ imgHeight +'"/>');
	saveContent($(this).val());
})*/

document.getElementById('workspace').addEventListener("input", function () {
	var imgUrl= $('#image').val();
	var imgWidth = $("#imgWidth").val();
	var imgHeight= $("#imgHeight").val();
	var imgText = $("#imgText").val();
	var txtPosition = $("#textAlignment").val();
	var txtColor = $("#textColorVal").val();
	console.log("URL:"+imgUrl);
	console.log("imgWidth:"+imgWidth);
	console.log("imgHeight:"+imgHeight);
//	$("#showImage").html('<img src="'+ imgUrl +'" width = "'+ imgWidth  +'" height = "'+ imgHeight +'"/>');
	saveContent(imgUrl,imgWidth, imgHeight, imgText, txtPosition, txtColor );
	updateSliderValues();
});

sdk.getData(function(data){
	var numberOfEdits = data.numberOfEdits || 0;
	console.log(JSON.stringify(numberOfEdits, null, 2));
	
	var htmlCode = '<table border="0" cellpadding="0" cellspacing="0" width="100%">'+'<tr>'+
	'<td background='+"'+ data.dataArray.image +'" +'height='+"'+ data.dataArray.imgHeight +'" +'width='+"'+ data.dataArray.imgHeight +'" +
	'></td>'+'</tr>'+'</table>';
	
	if(numberOfEdits == 0){
		sdk.setData({
			numberOfEdits: numberOfEdits + 1,
			dataArray: {"image": "0", 
						"imgText": "", 
						"imgWidth": "0", 
						"imgHeight": "0", 
						"txtPosition": "center",
						"txtColor": "black"
					    }
		})
	}else{
		$("#showImage").html(htmlCode);
		$("#image").val(data.dataArray.image);
		$("imgText").val(data.dataArray.imgText);
		$("imgWidth").val(data.dataArray.imgWidth);
		$("imgHeight").val(data.dataArray.imgHeight);
		$("#textAlignment").val(data.dataArray.txtPosition);
		$("#textColorVal").val(data.dataArray.txtColor);
		$("#currentResponse").html(JSON.stringify(data, null, 2));
		
	}
	console.log(JSON.stringify(data.dataArray, null, 2));
	
	
})



