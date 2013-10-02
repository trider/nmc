function loadXMLDoc(dname)
{

  if (window.XMLHttpRequest)
    {
      xhttp=new XMLHttpRequest();
    }
       
    xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4 && xhttp.status==200)
      {
          title=xhttp.responseXML.getElementsByTagName('item'); 
      }
    
    }
    xhttp.open("GET",dname, false);
	  xhttp.send();
    return '<h1>Data</h1>' + GetJSON(title);
    
} 


function GetJSON(title){

  var text=  '{ "customers" : [<br>'; 
 	 
   for (i=0;i<title.length;i++){ 
                  
           var name=title[i].getElementsByTagName('count_Chart1_CategoryGroup_label');
           var value=title[i].getElementsByTagName('count_Chart1_CategoryGroup_Value_Y');
           var num=title[i].getElementsByTagName('id');
           
           text = text + '{"name":"' + name[0].childNodes[0].nodeValue + '",' +
                    '"value":' + value[0].childNodes[0].nodeValue + '",' +
                    '"id":' + num[0].childNodes[0].nodeValue +
                    '},<br>'; 
                    
          if (name[0].childNodes[0].nodeValue=='Evolution'){
              i++;
          }
      
       
      
   
    }
      
    text = text + ']}<br>';  
    //var obj = eval ("(" + text + ")");
    return text; 
} 

		
function GetTable(){

	 
  var feed =  'http://epm10.nds.com/PWA/_vti_bin/ReportServer?http%3a%2f%2fepm10.nds.com%2fPWA%2fAnalyticsReports%2fEPM+Metrics%2fEPM+Stats.rdl&rs%3ACommand=Render&rs%3AFormat=ATOM&rc%3ADataFeed=xAx0x1xCx0';
  var url = "ReportServer.xml";
  return loadXMLDoc(url);    
 
   
}//end func




 