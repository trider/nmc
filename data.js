function loadXMLDoc(dname)
{
	if (window.XMLHttpRequest)
    {
      xhttp=new XMLHttpRequest();
    }
    
    xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4 && xhttp.status==200)
      {
          title=xhttp.responseXML.getElementsByTagName('Chart1')[0].childNodes; 
      }
    
    }
    
    xhttp.open("GET",dname,false);
	  xhttp.send();
	  return title;
}

function BuildHeader(title){
	
  var text='<tr><td></td>';
 	for (i=0;i<4;i++){          
    text = text + "<td>" + title[i].nodeName + "</td>";
  }//end for  
   
 	return text + '</tr>';
 
}//end func



function BuildCustLst(title){
	
  var lst = new Array();
                                           
  var name=title[0].childNodes[0].childNodes;
  for (j=0;j<name.length;j++){
    lst[j] = name[j].getAttribute("Label");
  }//end for    
  
 return lst;
}//end func


function GetJSON(title){

  var text=  '{ "customers" : ['; 
 	
 for (i=0;i<title.length;i++){
                                        
        var name=title[i].childNodes[0].childNodes;
        var val = '';
        
        for (j=0;j<name.length;j++){
              val = val + '{' +
                    '"name":"' + name[j].getAttribute("Label")+ '",' +
                    '"color":"' + title[i].nodeName + '",' +
                    '"value":' + name[j].childNodes[0].getAttribute("Y") + '},';
        } 
        
        text = text + val;
   
      }
      
      text = text + ']}';  
      var obj = eval ("(" + text + ")");
      return obj; 
} 

function BuildBody(title,lst){

  var obj = GetJSON(title);
  var text = '';
  
  for (i=0;i<lst.length;i++){
    var black; var red; var green; var yellow;
    for (j=0;j<obj.customers.length;j++){
      if(obj.customers[j].name==lst[i]){
        if (obj.customers[j].color=="Black"){
          black = '<td class="span1">' +  obj.customers[j].value + '</td>'; }
        else if(obj.customers[j].color=="Red"){
          red = '<td class="span1">' +  obj.customers[j].value + '</td>'; }
        else if(obj.customers[j].color=="Green"){
          green = '<td class="span1">' +  obj.customers[j].value + '</td>'; }
        else if(obj.customers[j].color=="Yellow"){
          yellow = '<td class="span1">' +  obj.customers[j].value + '</td>'; } 
      }
      var val = '<tr><td class="span2">'+ lst[i]+ '</td>' + black + red + green + yellow + '</tr>';
        
      }//end for
    
    text = text + val;
      
  }//end for
 	
  return text;
 
}//end func


function BuildTable(title,lst){

  return  '<p></p><table class="table table-striped" id="datatbl">'
          + BuildHeader(title)
          + BuildBody(title,lst) 
          +'</table>';

}//end func

		
function GetTable(dname, lst){

  var title=loadXMLDoc(dname);
  if(lst[0]=="All"||lst.length<1){
    lst  = BuildCustLst(title);
  }
 	var text = BuildTable(title, lst);
  return text;
 
}//end func

function PopulateLst(dname){

  var title=loadXMLDoc(dname);
 	var lst = new Array();
  lst = BuildCustLst(title);
  var val = '<label class="control-label" for="multiSelect">Customers</label>'
            +'<select multiple="multiple" id="Select01">'
            +'<option selected=true value="All">All</option>';
  
  for (i=0;i<lst.length;i++){
    val = val + '<option value="' + lst[i] + '">'
          +(lst[i])+'</option>';  
   
  }
  return val + '</select>';
 
}//end func

function GetGraphData(dname, lst){

  var title=loadXMLDoc(dname);
  var obj = GetJSON(title);
  var text = '[';
  
  if(lst[0]=="All"||lst.length<1){
    lst  = BuildCustLst(title);
  }
  
  for (i=0;i<lst.length;i++){
    var black; var red; var green;var yellow;
    for (j=0;j<obj.customers.length;j++){
      if(obj.customers[j].name==lst[i]){
        if (obj.customers[j].color=="Black"){
          black = obj.customers[j].value;}
        else if (obj.customers[j].color=="Red"){
          red = obj.customers[j].value; }
        else if (obj.customers[j].color=="Green"){
          green = obj.customers[j].value; }
        else if (obj.customers[j].color=="Yellow"){
          yellow = obj.customers[j].value;   
        }//end if
        
      }//end if
       
      var val = '{"name":"' + lst[i]+ 
                '","black":' + black +  
                ',"red":' + red +
                ',"green":' + green +
                ',"yellow":' + yellow +    
                '},';
        
      }//end for
    
    text = text + val;
      
  }//end for
 	text = text +']';   
  return eval ("(" + text + ")");
 
}//end func


 