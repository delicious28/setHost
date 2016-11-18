var url = require('url'); //解析操作url
var http=require("http");
var fs=require("fs");
var request = require('superagent'); 


function init()
{
	fs.readFile("/etc/hosts.local","utf8",function (error,data){
		 if(error) {
			 data="";
		 } ;

		 baseHelper.getPageInfo("https://raw.githubusercontent.com/racaljk/hosts/master/hosts",function (err, res,$) {

				if(err)
				{console.log(err)}

				var txt=data+"\n\r\n\r\n\r\n\r\n\r\n\r"+res.text;
				
				console.log(txt);
				
				 fs.writeFile("/etc/hosts",txt,function (err) {
					 if (err) throw err ;
					 //console.log("第"+currentPage+"页的数据抓取完毕"); //文件被保存
					 console.log("hosts is update")
				 });
			});
	});
}


var baseHelper={

	getPageInfo:function(url,callback)
	{
		request
		.get(url)
		.set("User-Agent","Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36")
		.end(function(err,res){
			//console.log(res);
			if(callback) callback(err,res);
		});
	}
}

init();


 
