
//fonction principale:
//-------------au chargement de la page html  dans l'IFRAME
             //affiche la structure
//$j('#myIFrame').load(function(){
//---------------------------------------------------


minify=function(val)
{


	return val.replace(/\t/ig, "").replace(/\n/ig, "").replace(/\s\s+/ig, "");
}
function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}
function formatFactory(html) {
    function parse(html, tab = 0) {
        var tab;
        var html = $j.parseHTML(html);
        var formatHtml = new String();

        function setTabs () {
            var tabs = new String();

            for (i=0; i < tab; i++){
              tabs += '\t';
            }
            return tabs;
        };


        $j.each( html, function( i, el ) {
            if (el.nodeName == '#text') {
                if (($j(el).text().trim()).length) {
                    formatHtml += setTabs() + $j(el).text().trim() + '\n';
                }
            } else {
                var innerHTML = $j(el).html().trim();
                $j(el).html(innerHTML.replace('\n', '').replace(/ +(?= )/g, ''));


                if ($j(el).children().length) {
                    $j(el).html('\n' + parse(innerHTML, (tab + 1)) + setTabs());
                    var outerHTML = $j(el).prop('outerHTML').trim();
                    formatHtml += setTabs() + outerHTML + '\n';

                } else {
                    var outerHTML = $j(el).prop('outerHTML').trim();
                    formatHtml += setTabs() + outerHTML + '\n';
                }
            }
        });

        return formatHtml;
    };

    return parse(html.replace(/(\r\n|\n|\r)/gm," ").replace(/ +(?= )/g,''));
};





compteur=0;
compteur2=0;
cpt=0;
oldElem=null;
window.onresize=res;
nomPage="";
redim_code = false;
down=false;
radioGrp ="";
currentPage=null //identifiant unique de la page
  docCSS=[];
//type de données affichées dans l'éditeur de code
editorType="html"
editedFilename=""
//indique si on vient de selectionner sur un objet en cliquant dessus
clickOnObject = false;
//tab
tabview="right";
//selected element
wdc_selected = ""
selection =null;
decalage=0;
displayPadding=false;
displayMargin=false;
copyObject=null;

//getvalueofselected
oldTarget = null;
oldVal = null;


function infosdisplay(t){
        $j(".outils").find("box").remove();
    $j(".outils").append(t);

}
///////////////////////////////////////////////////////////////////////////////////
//
//            Rafraichissement de l'interface
//
///////////////////////////////////////////////////////////////////////////////////
//->important $j('#myIFrame').load(function(){
//listeners
$j(document).on("get_db_table_list",function(e){

console.log(e.type+"-"+e.target+"-"+e.obj+"-"+e.val  )


e.stopImmediatePropagation();
e.preventDefault();

})



// selectobject
$j(document).on("showCode",function(e){

  var ele = $j("#myIFrame").contents().find("#"+e.obj);
        var t = ele[0].outerHTML;
          //   t=t.split("<").join("\n <");
//  t=t.split(">").join("> \n");
    //      t=t.split("</span>").join("\n </span> ");
   // t = t.replace(/\t\r\n/g, '');
      /*        editorAce2.getSession().setMode("ace/mode/html");
         editorAce2.setValue(t);


                editorAce2.resize();

  editorAce2.scrollPageUp();
          editorAce2.clearSelection();*/
    $j("#acedit").css("min-height","300px")




})

////-->selection

function showAceEditor(n){

  /*
showAceEditor("code_html");
showAceEditor("code_css_page");
showAceEditor("code_css_form_insite");
showAceEditor("code_css_insite");
showAceEditor("code_css_allsite");
showAceEditor("code_js_page");
showAceEditor("code_js_allsites");
*/


$j(".codex").css("visibility","hidden");
$j("#"+n).css("visibility","visible");
//alert($j("#acedit").css("min-height"))
if($j("#acedit").css("min-height") == "0px" ||  $j("#acedit").css("min-height") =="auto"){

    $j("#acedit").css("min-height","300px")
}
$j("#masquer").css("background-color","#52B7C7");
    $j("#acedit").css("display","block")
}


$j(document).on("selectObject1",function(e){
	//alert('pp')
// editorAce.setValue("");
 //editorAce2.setValue("");
//editorType = "code";
//showAceEditor("code_html");
myEditor.setValue("")
myEditor_js_page.setValue("")
myEditor_sql.setValue("")
$j("#sql").attr("data-filename","")
         $j("#ace_save").css("display",'none')
  $j(".code-menu").css("background-color","white");
  $j("#code").css("background-color","#97E3EB");
  $j(".code-menu").attr("data-selected","false");
    $j("#code").attr("data-selected","true");
editorType ="code";
showAceEditor("code_html");
  var ele = $j("#myIFrame").contents().find("#"+elemSelected);
//var ele = $j("#myIFrame").contents().find("#wdc-content");
var t = ele[0].outerHTML;
//var beautify = formatXml(minify(t));
myEditor.setValue(t);
myEditor.refresh();

localStorage.setItem('code',t);
$j("#edited_filename").css("display",'none')

 var ele = $j("#myIFrame").contents().find("#"+e.obj);

         //   t=t.split("<").join("\n <");
//  t=t.split(">").join("> \n");
   //      t=t.split("</span>").join("\n </span> ");
  // t = t.replace(/\t\r\n/g, '');
          //   editorAce2.getSession().setMode("ace/mode/html");
      //  editorAce2.setValue(t);

          // editor.scrollToLine(0);
   //editorAce2.resize();
 //editorAce2.scrollPageUp();
    //     editorAce2.clearSelection();
//  $j("#acedit").css("min-height","300px")
      // var t = ele[0].outerHTML;

			// var beautify = formatXml(minify(t));

//var beautify = formatFactory(t.trim());
//myEditor.setValue(beautify)
//$j("#code").click();
//myEditor_sql.setValue("");
  $j("#edited_filename").text("");

    $j(".flx").css("width","auto")
  //  $j(".flx").toggle("1000" );
    if(e.obj != oldElem){
         console.log(e.obj+"//"+oldElem);
    var elem = "#"+e.obj;
    oldElem = e.obj;
//si #sql display bloc -> affiche requete
if($j("#sql").attr("data-selected")=="true"){
$j("#edited_filename").text("");
}



$j("#myIFrame").contents().find(".outlined").css("outline","none").removeClass("outlined");

var ele = $j("#myIFrame").contents().find("#"+e.obj);

             //liste des composants disponibles dans l'éditeur, pour charger les propriétés avec loadExternalData -> loadxmlprop
                                                                               // target tabs-3

   for (var i = 0; i < components_list.length; i++) {

      if (components_list[i].name.toLowerCase() == ele.attr("data-wdctype").toLowerCase()) {
      //console.log("loadddddddddddselected------------>"+components_list[i].name.toLowerCase() +"///"+ele.attr("data-wdctype").toLowerCase())
          loadXmlProp(components_list[i].url,"#tabs-3","xml","test");
      // loadExternalData(components_list[i].url,,"xml")
      }
    }


//components_list.push({"name":this.name,"url": this.dir+"/"+this.src+".xml","target":"tabs-3"});



     //met à jour les propriétés FLEXBOX
  //  var classname = ele.attr('class').split(/\s+/);

    var direction;
    var did=15;
    if(ele.hasClass("flex-container-column")){
     direction = "flex-container-column";
        did=15;
    }else if(ele.hasClass("flex-container-column-reverse")){
       direction = "flex-container-column-reverse"
        did=16;
    }else if(ele.hasClass("flex-container-row")){
         direction = "flex-container-row"
          did=17;
    }else if(ele.hasClass("flex-container-row-reverse")){
          direction = "flex-container-row-reverse"
           did=18;
    }
    /* $j("#flex_direction").append('<img class="flexpos"  " data-display="'+direction+'" style="cursor:pointer;position:relative;" src="./assets/icones/flexbox/bande'+did+'.png">'  );*/

    $j(".flexpos").attr("src","./assets/icones/flexbox/bande"+did+".png")

      $j(".flexpos").attr("data-display",direction)




        var A =  ["flex-justify-content-start", "flex-justify-content-center","flex-justify-content-end","flex-justify-content-space-around","flex-justify-content-space-between"];
        var ligne = "";
    var exist = false;
        for (i=0;i<5;i++) {

            if(ele.hasClass(A[i])){
             exist = true;
               $j("#flex_axe1").empty();
       $j("#flex_axe1").append('<div class="flex_x1 '+direction+' '+A[i]+'   " data-display="'+A[i]+'" style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"><div style="height:7px;width:7px;background-color:#6CDFEA;"></div><div style="height:7px;width:7px;background-color:grey"></div><div style="height:7px;width:7px;background-color:lightgrey"></div></div>'  );
               };

         if(!exist){
           $j("#flex_axe1").empty();
       $j("#flex_axe1").append('<div class="flex_x1 '+direction+'  " data-display="" style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"></div>'  );
               $j("#flex_axe2").empty();
       $j("#flex_axe2").append('<div class="flex_x2 '+direction+'   " data-display="" style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"></div>'  );

         }


        };


 exist = false;
         var x1 =   $j("#flex_axe1").find(".flex_x1").attr("data-display")
        A =  ["flex-align-items-start", "flex-align-items-center","flex-align-items-end","flex-align-items-stretch"];
        var ligne = "";
        for (i=0;i<4;i++){

          if(ele.hasClass(A[i])){
              exist = true;
                $j("#flex_axe2").empty();
             $j("#flex_axe2").append('<div class="flex_x2 '+direction+' '+x1+' '+A[i]+'   " style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"><div style="min-height:7px;min-width:7px;background-color:#6CDFEA;"></div><div style="min-height:7px;min-width:7px;background-color:grey"></div><div style="min-height:7px;min-width:7px;background-color:lightgrey"></div></div>');
          }

               if(!exist){

               $j("#flex_axe2").empty();
       $j("#flex_axe2").append('<div class="flex_x2 '+direction+'   " data-display="" style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"></div>'  );

         }


        }
    var im="";
    if(ele.hasClass("flex-wrap-nowrap")){
   $j(".flexwrap").attr("src","./assets/icones/flexbox/bande106.png");
        $j(".flexwrap").attr("data-display","nowrap");
    }else if(ele.hasClass("flex-wrap-wrap")){


           $j(".flexwrap").attr("src","./assets/icones/flexbox/bande105.png");
           $j(".flexwrap").attr("data-display","wrap");

    }else{
         $j(".flexwrap").attr("src","./assets/icones/flexbox/bande106.png");
         $j(".flexwrap").attr("data-display","nowrap");


    }

         if(ele.hasClass("flex-child-grow")){
   $j(".flexstretch").attr("src","./assets/icones/flexbox/bande127.png");
      $j(".flexstretch").attr("data-display","stretch");
    }else if(ele.hasClass("flex-child-default")){


           $j(".flexstretch").attr("src","./assets/icones/flexbox/bande128.png");
           $j(".flexstretch").attr("data-display","default");

    }else{
         $j(".flexstretch").attr("src","./assets/icones/flexbox/bande128.png");
         $j(".flexstretch").attr("data-display","default");


    }





      //$j(".flx").fadeIn( "slow")
   /* $j( ".flx" ).animate({
    width: "1000"
  }, 3000)*/
  //  $j(".flx").toggle( "1000" );
    //fin FLEXBOX
















       if($j(ele).attr("id") != wdc_selected){
                var elem = "#"+wdc_selected;
               // console.log(elem)
                if(elem != "#"){
             //   $j("#myIFrame").contents().find(elem).css("outline","dashed 1px lightgrey");

                $j("#myIFrame").contents().find(elem).css("color","black");
            };

           //  $j(ele).css("background-color","rgba(109,100, 184,0.3)");
               }
         // $j(ele).css("background-color","rgba(205, 106, 0,0.3)");
       // $j(ele).css("outline","dashed 2px red");
                                  //$j(ele).css("color","red");
                                     //  $j(ele).css("border","solid 1px yellow");
               wdc_selected = $j(ele).attr("id");
            elemSelected = wdc_selected;
     // wdc_affiche_calques("#"+wdc_selected,true);








    }





})

function init_elem(ele){


$j(ele).addClass('structure');


    var info =$j("#myIFrame").contents().find(".infos");

    $j(ele).on( "click", function( event ) {
   /*
         event.stopImmediatePropagation();
            event.preventDefault();

        wdc_selected = $j(ele).attr("id");
        elemSelected = wdc_selected;
        parent.top.diffuseEvent("selectObject1",wdc_selected);
           parent.top.diffuseEvent("newSelectedElement",elemSelected);

          $j("#myIFrame").contents().find(".wdc").css("outline","none");
   $j(ele).css("outline","dashed 2px red");
                 $j(ele).css("outline-offset", "4px");
        document.getElementById('myIFrame').contentWindow.testo($j(this));



  var img =    $j(ele).css("background-image");

        img = img.split('"').join('');
       img.split("&quot;").join("");
        $j(ele).css("background-image",img);
        */
    });




          var name = $j(ele).attr("data-wdcname");
      if (!name){
       var     name = $j(ele).attr("id");
     };
//$j(ele).css('margin','15.1px')

   // $j(ele).css("outline-offset","1px");
//$j(ele).css('background-color','white')
//$j(ele).css("color","black");
if($j(ele).attr('data-wdctype')=="flex_row"){

//$j(ele).prepend('<div class="wdc_label_structure" style="position:absolute;top:0px;left:0px;"><img class="dir_ico" src ="../../../system/assets/interface/wdc_row.png"><span id="elem_label" style="position:relative;height:15px;top:0px;left:12px;width:auto;font-size:10px;padding-left:2px" ></span></div>');

}else{




//$j(ele).prepend('<div class="wdc_label_structure"  style="position:absolute;top:0px;left:0px;"><img class="dir_ico" src ="../../../system/assets/interface/wdc_column.png"><span id="elem_label" style="position:relative;height:15px;top:-5px;left:4px;width:auto;font-size:10px;padding-left:2px" ></span></div>');

}
     //   $j(ele).find("#elem_label").text(name)

//clic droit sur l'élément -> contextMenu


$j(ele).contextmenu(function(event) {





$j("#myIFrame").contents().find(".custom-menu1").css("display","none");
            if($j(ele).attr("id") != wdc_selected){
                var elem = "#"+wdc_selected;
               // console.log(elem)
                if(elem != "#"){
              //  $j("#myIFrame").contents().find(elem).css("outline","dashed 1px lightgrey");

               // $j("#myIFrame").contents().find(elem).css("color","black");

            };
               }

        //$j(ele).css("color","red");

        wdc_selected = $j(ele).attr("id");
        elemSelected = wdc_selected;

        parent.top.diffuseEvent("selectObject1",wdc_selected);
        parent.top.affiche_chemin("#"+wdc_selected);


  $j("#myIFrame").contents().find(".custom-menu1").css({
        display:"block",
        top: event.pageY + "px",
        left: event.pageX + "px"
    });

            event.stopImmediatePropagation();
            event.preventDefault();

});







//survol sur l'élément

//over
       $j(ele).on("mouseenter",function(event){




         //   $j(ele).find('#elem_label').css("visibility","visible")

             if($j(ele).attr("id") != wdc_selected){
                 var elem = "#"+wdc_selected;
               // console.log(elem)
                if(elem != "#"){
            //    $j(elem).css("background-color","white");
                   //   $j(elem).css("color","black");
            };
                  // $j(ele).css("outline","dashed 2px red");

        //     $j(ele).css("background-color","rgba(109,100, 184,0.3)");
               }

           event.stopImmediatePropagation();
       });


    //out
  $j(ele).on("mouseleave",function(event){
               if($j(ele).attr("id") != wdc_selected){
            //$j(ele).css("background-color","white");
                //  $j(ele).css("outline","dashed 1px lightgrey");
               }
         //          $j(ele).find('#elem_label').css("visibility","hidden")
            event.stopImmediatePropagation();

       })




 //clic sur l'élément

        $j(ele).on("click",function(event){




                document.getElementById('myIFrame').contentWindow.showSelected($j(this));
               document.getElementById('myIFrame').contentWindow.testo($j(this));
       $j("#myIFrame").contents().find(".custom-menu1").css("display","none");
            if($j(ele).attr("id") != wdc_selected){
                var elem = "#"+wdc_selected;
               // console.log(elem)
                if(elem != "#"){
               // $j("#myIFrame").contents().find(elem).css("outline","dashed 1px lightgrey");

               // $j("#myIFrame").contents().find(elem).css("color","black");

              $j('#wdc_calques_arbo').jstree("deselect_node",elem);
            };

           //  $j(ele).css("background-color","rgba(109,100, 184,0.3)");
               }
         // $j(ele).css("background-color","rgba(205, 106, 0,0.3)");
       // $j(ele).css("outline","dashed 2px red");
                                //  $j(ele).css("color","red");
                                     //  $j(ele).css("border","solid 1px yellow");
               wdc_selected = $j(ele).attr("id");
            elemSelected = wdc_selected;
            var qr ="#"+wdc_selected;
         //   console.log(":::::::"+qr);
              $j('#wdc_calques_arbo').jstree("select_node",qr);

            //parent.top.diffuseEvent("selectObject1",wdc_selected);
              // parent.top.elemSelected = wdc_selected;
                  //        parent.top.affiche_chemin("#"+wdc_selected);
            //a destination des menus latéraux ("border, etc...)
             parent.top.diffuseEvent("newSelectedElement",elemSelected);

                // wdc_affiche_calques("#"+wdc_selected,true);

             //     $j(ele).find('#elem_label').css("visibility","visible")
              event.stopImmediatePropagation();
       });

      var img =    $j(ele).css("background-image");
    console.log("----img--->"+img);
    if(img != "none" && img != undefined){

      img =  img.split("&quot;").join("");
        img = img.split('"').join('');
        $j(ele).css("background-image",img);
}else{
         $j(ele).css("background-image","");
}

    }//fin init ele




function res() {


var p_largeur = parseInt(pageWidth());
var p_hauteur = parseInt(pageHeight())-210;//121
var p_right =0;
var p_left =0;
var p_center =0;



 //largeur mini p-right
    $j.wdc_Interface_RedimRightLimit2 = p_largeur-350;
    $j.wdc_Interface_RedimRightLimit1 = p_left + 100;
    $j.wdc_Interface_workspace_height = p_hauteur;

 //css
    $j(".legende_header").addClass("flex-container-row")
    $j(".legende_header").css("max-height","22px")
    $j(".propT").css("padding-top","2px")
     $j(".propT").css("padding-right","5px")





}


///////////////////////////////////////////////////////////////////////////////////
//
//           Initialisation ready
//
///////////////////////////////////////////////////////////////////////////////////

$j(document).ready(function($) {

	newSite=true;
    var date = new Date;

  var queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);
  queue.on("complete", handleComplete, this);
  //preload.on("fileload", handleFileLoad);
  queue.on("progress", handleOverallProgress);
  queue.on("fileprogress", handleFileProgress);
  //preload.on("error", handleFileError);
  queue.loadFile("./jquery-plugins/slider-pips/jquery-ui-slider-pips.js");
  queue.loadFile("./jquery-plugins/slider-pips/jquery-ui-slider-pips.css");
  queue.loadFile("./jquery-plugins/tooltipster/css/tooltipster.css");
  queue.loadFile("./jquery-plugins/tooltipster/css/themes/tooltipster-shadow.css");
  queue.loadFile("./jquery-plugins/tooltipster/js/jquery.tooltipster.min.js");
  queue.loadFile("./jquery-plugins/context-menu/jquery.contextMenu.js");
  queue.loadFile("./jquery-plugins/context-menu/jquery.contextMenu.css");
  queue.loadFile("./32px.png");
  queue.loadFile("./js/jBox/jBox.css");
  queue.loadFile("./js/jBox/jBox.js");
  queue.loadFile("./js/jBox/plugins/Confirm/jBox.Confirm.css");
  queue.loadFile("./js/jBox/plugins/Confirm/jBox.Confirm.js");
  queue.loadFile("./js/jBox/plugins/Notice/jBox.Notice.css");
  queue.loadFile("./js/jBox/plugins/Notice/jBox.Notice.js");
  queue.loadFile("./js/color-wheel/html5kellycolorpicker.js");
  queue.loadFile("./js/codemirror-5.36.0/lib/codemirror.js");
    queue.loadFile("./js/codemirror-5.36.0/lib/codemirror.css");
      queue.loadFile("./js/codemirror-5.36.0/doc/docs.css");
      queue.loadFile("./js/codemirror-5.36.0/mode/xml/xml.js");
			  queue.loadFile("./js/codemirror-5.36.0/mode/sql/sql.js");
        queue.loadFile("./js/codemirror-5.36.0/mode/javascript/javascript.js");
      queue.loadFile("./js/codemirror-5.36.0/mode/css/css.js");
        queue.loadFile("./js/codemirror-5.36.0/mode/htmlmixed/htmlmixed.js");
        queue.loadFile("./js/codemirror-5.36.0/addon/fold/xml-fold.js");
          queue.loadFile("./js/codemirror-5.36.0/addon/edit/matchtags.js");
				        queue.loadFile("./js/codemirror-5.36.0/addon/selection/active-line.js");
        queue.loadFile("./js/codemirror-5.36.0/mode/xml/xml.js");
  queue.loadFile("./js/codemirror-5.36.0/addon/edit/matchbrackets.js");
queue.loadFile("./js/codemirror-5.36.0/theme/cobalt.css");
  /*queue.loadFile("./js/codemirror-5.36.0/addon/hint/show-hint.css");
  queue.loadFile("./js/codemirror-5.36.0/hint/show-hint.js");
  queue.loadFile("./js/codemirror-5.36.0/hint/sql-hint.js");
  /*
  queue.loadFile("./jquery-plugins/ace/ace.js");
  queue.loadFile("./jquery-plugins/ace/theme-twilight.js");
  queue.loadFile("./jquery-plugins/ace/mode-javascript.js");
  queue.loadFile("./jquery-plugins/ace/mode-css.js");
  queue.loadFile("./jquery-plugins/ace/mode-html.js");*/

  queue.loadFile("./js/css.js-master/css.js");

  queue.loadFile("./jquery-plugins/jstree/css/style.css");

  queue.loadFile("./wdc/handles.css?_=" + Date.now());
  queue.loadFile("./wdc/systemcss.css?_=" + Date.now());

  queue.loadFile('./wdc/interface/ui/button_css.js?_=' + Date.now());
  queue.loadFile('./wdc/interface/ui/wdc_utils.js?_=' + Date.now());
  queue.loadFile('./wdc/interface/ui/wdc_ui_dialogs.js?_=' + Date.now());
  queue.loadFile('./wdc/interface/ui/wdc_ui_components.js?_=' + Date.now());
  queue.loadFile('./wdc/interface/ui/wdc_ui_combo.js?_=' + Date.now());
  queue.loadFile('./wdc/interface/ui/wdc_stylesheets.js?_=' + Date.now());
  queue.loadFile('./wdc/interface/ui/wdc_page_js.js?_=' + Date.now());

  queue.loadFile('./wdc/interface/ui/wdc_input_mesure_spinners.js?_=' + Date.now());

  queue.loadFile('./wdc/interface/ui/wdc_ace_edfitor.js?_=' + Date.now());
  queue.loadFile('./wdc/interface/ui/wdc_loader_page.js?_=' + Date.now());
  queue.loadFile("./jquery-plugins/jstree/jstree.js");

    -->


// File progress handler
	function handleFileProgress(event) {
    	var item = event.item;
      var result = event.result;
      var id = item.id;
			//console.log(event.item.src+"--"+(event.progress*100))
			// $j("#starter").text(event.item.src+"--"+(event.progress*100))
  //    $j("#starter").text(item.src);
      switch (item.type) {
  		case createjs.Types.CSS:
  		//	(document.head || document.getElementsByTagName("head")[0]).appendChild(result);
//console.log(item.src)
//$j('head').append('queue.loadFile("'+item.src+'" type="text/css" />');
  			break;

  		case createjs.Types.IMAGE:
  			break;

  		case createjs.Types.JAVASCRIPT:
  		//	document.body.appendChild(result);

  			break;

  		case createjs.Types.JSON:
  		case createjs.Types.XML:
  			break;
  		case createjs.Types.JSONP:
  			break;
  		case createjs.Types.SOUND:
  			document.body.appendChild(result);
  		//	result.play();

  			break;
  		case createjs.Types.SVG:
  			break
  	}
		//var div = map[event.item.id]; // Lookup the related item
	//	div.children("DIV").width(event.progress * div.width()); // Set the width the progress.
	}

	// Overall progress handler
	function handleOverallProgress(event) {
  //console.log(event);
		//$("#mainProgress > .progress").width(preload.progress * $("#mainProgress").width());
		//console.log(event.item.src+"--"+(event.progress*100))

$j("#starter").text(parseInt(event.progress*100)+"%")
$j("#starter").css("width",(parseInt(event.progress*100)/2)+"%")
	}
  function handleComplete() {
  // console.log("Scripts chargés")
	 $j("#progressloaded").css("display","none")
    initialize();
  }

  //  initialize();
     }); // fin fonction on load documentdocument ready


function initialize(){

          $j("#bt-s6").on("click",function(){

   $j("#myIFrame").css("max-width","320px")

          })
          $j("#bt-s5").on("click",function(){

   $j("#myIFrame").css("max-width","480px")

          })
          $j("#bt-s4").on("click",function(){

   $j("#myIFrame").css("max-width","768px")

          })
          $j("#bt-s3").on("click",function(){

   $j("#myIFrame").css("max-width","1024px")

          })
          $j("#bt-s2").on("click",function(){

   $j("#myIFrame").css("max-width","1280px")

          })
          $j("#bt-s1").on("click",function(){

   $j("#myIFrame").css("max-width","")

          })

      //infobulle
    $j(".infobulle").each(function(){

         $j(this).jBox('Mouse',{
    content: $j(this).attr("data-infobulle")
  });

    })


// gestion du clavier

    $j( document ).on( "keydown", function( event ) {


        //touche P pour menu propriétés
        console.log(event.which)

       if(event.which ==77  && event.ctrlKey) {
           //ctrl+m
           if($j("#bt-margin").find("img").css("opacity")=="0.5") {

          $j("#bt-margin").find("img").css("opacity","1")

      } else {
          $j("#bt-margin").find("img").css("opacity","0.5")

      }
           $j("#bt-margin").click();

           } else if(event.which == 90  && event.ctrlKey) {

                            parent.top.$j( "#tabs" ).tabs( "option", "active", 3 );

           }
    else if(event.which == 86  && event.ctrlKey) {
           //ctrl+s
           if(parent.top.$j("#bt-viewblocks").find("img").css("opacity")=="0.5") {

          parent.top.$j("#bt-viewblocks").find("img").css("opacity","1")

      } else {
          parent.top.$j("#bt-viewblocks").find("img").css("opacity","0.5")

      }
           parent.top.$j("#bt-viewblocks").click();


       }   else if(event.which == 83  && event.ctrlKey) {
           //ctrl+s

           parent.top.$j("#bt-save").click();

       }   else if(event.which == 80  && event.ctrlKey) {
           //ctrl+v
         if(parent.top.$j("#bt-padding").find("img").css("opacity")=="0.5") {

          parent.top.$j("#bt-padding").find("img").css("opacity","1")

      } else {
          parent.top.$j("#bt-padding").find("img").css("opacity","0.5")

      }
           parent.top.$j("#bt-padding").click();

       } else if(event.which == 82  && event.ctrlKey) {
           //ctrl+s
        if(parent.top.$j("#rightzone").css("display") == "none"){
           parent.top.$j("#rightzone").css("display","block");
        }else{

                 parent.top.$j("#rightzone").css("display","none");

                };
        }else if(event.which == 65  && event.ctrlKey) {
           //ctrl+a

              parent.top.$j( "#tabs" ).tabs( "option", "active", 1 );




       }else if(event.which == 67  && event.ctrlKey) {
           //ctrl+a

              parent.top.$j( "#masquer").click();


       };
 /*     if(event.which == 80  && event.ctrlKey) {
     // alert('You pressed ctrl!');




 $j( ".ui-dialog").css("padding","0px")
  $j( ".ui-dialog").css("border-radius","4px")
   $j( ".ui-dialog").css("border","0px");
             $j( ".ui-dialog").addClass("dialog-box-shadow");
          $j( ".ui-resizable-handle").css("opacity","0")
          $j(".ui-dialog-titlebar").css("height","30px")
            $j(".ui-dialog-titlebar").css("font-size","18px")
            $j(".ui-dialog-titlebar").css("font-family","Open Sans")
            $j(".ui-dialog-titlebar").css("font-weight","normal")
           // $j(".ui-dialog-titlebar").css("color","White")
           $j(".ui-dialog-titlebar").css("background-color","white")
                 $j(".ui-dialog-titlebar").css("border-bottom","1px solid grey")

          $j(".ui-dialog .ui-dialog-content").css("padding","0px")


             if($j("#rightzone").css("display") == "none"){
              $j("#tabs").appendTo("#rightzone")
               $j("#tabs").css("border-width","0px")

          $j("#rightzone").css("display","block");
                       $j("#modal_props").css("display","none");
      }else{




          $j("#tabs").appendTo(".props")

           $j("#rightzone").css("display","none");
            $j("#modal_props").css("display","block");

      }


    }*/



});

   //  $j("#prop_context").css("display","none");
    // $j("#prop_context2").css("display","none");
   //  $j("#fil_ariane").css("display","none");
    //     $j("#acedit").css("display","none");
    // $j("#footer").css("display","none");
 //$j("#rightzone").css("display","none");
 //$j("#leftzone").css("display","block");
//$j("#centerzone-").css("display","none");

    //* test ajouter classe
   // z = new Button_css();
   // z.getObject().css("color","purple")

 //  var n = new Button_css();

  //  n.getObject().css("color","green")

 // var n = new Button_css();

   // n.getObject().css("color","blue")

 //  n=null;
  //  delete n;



   //  création panneau sites

   site_actif = "default"

    var recup_site_actif =  localStorage.getItem("site_actif");

    if(recup_site_actif){
     site_actif = recup_site_actif;
        $j(".currentSite").text(site_actif);
    }



                           $j.ajax({
                     type: "POST",
                     url: "../php/list_sites.php",
                     success: function(data) {
               var dt = data.split(',');
                        //dt.pop();
                        // console.log(dt);
                         opts =""



                    var selsite = false;

                             for(i=0;i<dt.length;i++){


                  if(site_actif == dt[i]){
                      selsite = "true" ;
                      op = "opacity:1;"

                  } else{

                        selsite = "false" ;
                      op = "opacity:0.5;"
                  }




          $j("#flex_row-panneau2").append('<div id="site'+i+'" class="wdc sites flex-container-column flex-justify-content-end flex-align-items-stretch background-size-cover shadow1" data-wdctype="flex_column" data-selsite="'+selsite+'" data-locked="false" data-wdcname="diapos" style="'+op+' background-image: url(../sites/'+dt[i]+'/snapshot.jpg)" data-target="'+dt[i]+'">  <div id="legende" class="wdc flex-container-row flex-justify-content-center flex-align-items-start flex-child-default" data-wdctype="flex_row" data-wdcname="legende" data-locked="false">'+dt[i]+'</div></div>');




                             }


      $j("#flex_row-panneau2").append('<div id="ajouter_site" class="wdc sites flex-container-column flex-justify-content-end flex-align-items-stretch background-size-cover shadow1" data-wdctype="flex_column" data-locked="false" data-wdcname="diapos" style="background-image: url(../system/assets/interface/ajoute_site.png)" data-target="ajouter_site">  <div id="legende" class="wdc flex-container-row flex-justify-content-center flex-align-items-start flex-child-default" data-wdctype="flex_row" data-wdcname="legende" data-locked="false">Ajouter un site</div></div>');

     $j(".sites").on("click",function(){
                    $j(".sites").css("opacity","0.5");
           var me = this;
         localStorage.setItem("site_actif",$j(this).attr("data-target"))
          var arr = {

name:$j(this).attr("data-target"),
create:"false"

      };

          $j.ajax({
                     type: "POST",
                     url: "../php/set_site_actif.php",
                    dataType: 'json',
                        data:JSON.stringify(arr),
              success: function(data) {
              //


                 // alert($j(me).attr("data-target"))
                      if(data.reponse == $j(me).attr("data-target")){
                            $j(".currentSite").text($j(me).attr("data-target"));
                                $j(me).css("opacity","1");

                      }
          // document.location.href =document.location.href ;
					//$j('#apptree').empty();
					if($j('#apptree').jstree){
						$j('#apptree').jstree("destroy");

					}
$j("#myIFrame").attr("src","")
					 			appendTree()
                 //     $j("#rightzone").empty();



                  //  getTools();

                //$j("#rightzone").append('<div id="tabs" ><ul id="tabs-bts"></ul></div>');

               // $j( "#tabs" ).tabs();
                 //  init_tools();


                     }
          })

                      //  alert($j(this).attr("data-target"))



                     })

     $j(".sites").on("mouseenter",function(){

              //  $j(this).css("opacity","1");



                     })
                              $j(".sites").on("mouseleave",function(){

               // $j(this).css("opacity","0.5");



                     })

                     }
                           });

    //ajoute un denier élément










//creation les boites de dialogue qui seront utilisées dans l'interface
//boite input

 new_alert = new wdc_alert();
 new_confirm = new wdc_confirm();
new_rqt =  new  wdc_input_name("Créer une nouvelle requête","saveSQL","");
new_input_string = new wdc_input_string();

var menuflottant = '<ul id="styles_menu" class="custom-menu1" style="display:none;width:260px"><li class="menuitem" data-action="nouveau">Créer nouveau style à partir de la sélection</li></ul>';
    $j("body").append(menuflottant);
var menuflottant2 = '<ul id="styles_menu2" class="custom-menu1" style="display:none;width:260px"><li class="menuitem" data-action="newcolor">Ajouter cette couleur au nuancier</li></ul>';
    $j("body").append(menuflottant2);


//global click
        $j(window).mouseup(function() {
    down = false;
              $j("body").css("cursor","default");


});
    $j(document).click(function(event) {

        //console.log($j(event.target).attr("class"))
/*  if($j(event.target).hasClass("menuitem")) {
             //console.log($j(event.target).attr("class"))

   }   else{
               event.preventDefault();
       event.stopPropagation();




           $j(".custom-menu1").each(function(){

               if($j(this).css("display")=="block"){

                   if($j(event.target).hasClass("mnst")){



                   }else{
                       $j(this).css("display","none");
                   }


              //     $j(this).css("display","none");

               }
           })




       console.log($j(event.target).attr("class"))
   }  */
});







      avc = new jBox('Modal', {
    width:580,
    height:420,
    blockScroll:false,
          closeButton:false,
          closeOnClick:false,
    content: '<div id ="identification" class="flex-container-column " style="border:none;padding:20px;background-repeat:no-repeat;background-image:url(../system/assets/icones/wdc-logo.png)"  ><form id="login"><div class="flex-container-column border-radius border-line space-bottom " style="margin-top:150px;"><input placeholder="Identifiant" id="wdclog" class="flex-child-grow input-trans" style="font-size:16px" value="" type="text"></div><div class="flex-container-column border-radius border-line space-bottom"><input placeholder="Mot de passe" id="wdcpass" class="flex-child-grow input-trans" style="font-size:16px" value="" type="password"></div><div class="form-check space-bottom"> <input id="checkbox-1-1" class="ui-checkbox mem" style="" checked type="checkbox"><label for="checkbox-1-1" style="cursor: pointer;font-size:16px">Garder en mémoire</label> </div><div class="flex-container-row flex-justify-content-center" ></form><div id="btlog"  class="button" style="font-size:16px;width:80px;text-align:center" id="submitButton-4570_vav">GO</div></div></div>'
});
                       avc.open();

    var memLogin =  localStorage.getItem("superlogin");
        var memPass =  localStorage.getItem("superpass");

    if(memLogin){

        $j("#wdclog").val(memLogin);
    }
      if(memLogin){

        $j("#wdcpass").val(memPass);

    }

    $j("#btlog").click(function(){

        var $login = $j("#wdclog").val();
        var $pass = $j("#wdcpass").val();
        localStorage.setItem("superlogin", $login);
        localStorage.setItem("superpass", $pass);
        if($login == ""){

            $j("#wdclog").css("background-color",'pink')

        }
        if($pass == ""){
             $j("#wdcpass").css("background-color",'pink')

        }

        if($login != "" && $pass != ""){



               var scriptPhp = "../php/superok.php";

          var arr = {

 login:$login,
 pass:$pass

      };


 $j.ajax(

            {

                url: scriptPhp,
                type: "POST",
                dataType: 'json',
                   data:JSON.stringify(arr),
                success: function(rep) {

                    if(rep.reponse=="okLogin"){

                          avc.close();
                          $j(".props").css("display","flex");
                          $j(".tools").css("display","flex");
                          $j("#wdc").css("display","flex");

                        //desactiver enregistrement si non connecté
                    }else{

                   alert("Identifiants non reconnus")

                    }

                }
            });

        }

    })



 //----------- Variables globales------------------
var cpt = parseInt($j("#wdc-content").attr("data-cpt"))
if(cpt.length > 0){
    cpt = parseInt($j("#wdc-content").attr("data-cpt"));

}else{
    cpt=0;
}
   // console.log("^^^"+localStorage.getItem("compteur1"))
    if(isNaN(localStorage.getItem("compteur1"))){
        localStorage.setItem("compteur1",0);
    }

if(localStorage.getItem("compteur1") === null){
    localStorage.setItem("compteur1",0);
    compteur2=0;
}else if(parseInt(localStorage.getItem("compteur1")) > 999){
      localStorage.setItem("compteur1",0);
} else {
  compteur2 =   parseInt(localStorage.getItem("compteur1"));


}
     if(isNaN(localStorage.getItem("compteur"))){
        localStorage.setItem("compteur",0);
    }

if(localStorage.getItem("compteur") === null){
    localStorage.setItem("compteur",0);
    compteur=0;
}else if(parseInt(localStorage.getItem("compteur")) > 999){
      localStorage.setItem("compteur",0);
} else {
  compteur =   parseInt(localStorage.getItem("compteur"));


}


init_tools();
//-------------au chargement de la page html  dans l'IFRAME
             //affiche la structure

$j('#myIFrame').load(function(){
   // console.log("load.....");

     //  editorAce.setValue($j(this).contents());

  //charge CSS------------
 //addStyleSheet();

clearEditors();








//var ifh = $j("#myIFrame").contents().find("#wdc-content").height();
        $j(".flx").css("width","0px");
        $j("#elemSelected").text("");
var t =     $j("#myIFrame").contents().find("#wdc-content").html();
   $j("#myIFrame").contents().find("*").append('\n');
//editor.setValue($j("#myIFrame").contents().find("#wdc-content").html());

   // $j(".structure").html(t);


//$j("#panel_edit_center").height(ifh);
var ifw = $j("#myIFrame").contents().find("#wdc-content").width();

    //largeur du support de visualisation
//$j("#panel_edit_center").width("1200px");

//affiche arbre_dom
affiche_arbre_dom();

//affiche la liste des calques
wdc_affiche_calques("#wdc-content",true);

var el = document.getElementById('myIFrame');

$j("#myIFrame").contents().find(".textcontent").attr("contenteditable","true");
$j("#myIFrame").contents().find("a").each(function(){
	var href = $j(this).attr("href");
	$j(this).attr("data-href",href);
	 $j(this).attr("href","javascript:void(0)");
})





/*
if(el.contentWindow)
{
   el.contentWindow.initTinyEditor();
}
else if(el.contentDocument)
{
   el.contentDocument.initTinyEditor();
}
*/


 // charge feuille de style=

docCSS["page_custom"] = null;
docCSS["site_custom"]= null;
docCSS["form_custom"]= null;

       // page_css et site_css sont définis dans site_arbo.js


loadCSS(page_css,"page_custom");
loadGlobalCSS(site_css,"site_custom");
loadGlobalCSS(form_css,"form_custom");

   $j(document).on("globalCssSaved", function(evt){
       //alert("ok")
     reloadFormCss();


   })
 /*$j(document).on("globalCssLoaded", function (evt) {

     if(evt.name = "form_custom"){
   var parser;
    var parsed;

     parser = docCSS["form_custom"].parser;
     parsed = docCSS["form_custom"].parsed;

  //console.log(parsed)

parser.getStyle(parsed,".form_style-color:focus","color")
  //parser.setStyle(parsed,".form_style-color:focus","color","green")
saveGlobalCSS("form_custom",parser.getCSSForEditor(parsed))
     }

 });*/




$j(document).on("cssLoaded", function (evt) {

    var parser;
    var parsed;

   parser = docCSS["page_custom"].parser;
   parsed = docCSS["page_custom"].parsed;

    var divList=[]  ;

          $j("#myIFrame").contents().find(".wdc").each(function(){

                if($j(this).attr("id") !="wdc"){

                  divList.push($j(this).attr("id"))  ;

                }

          })


  parser.getAllBasicStyles(parsed,divList);



    //diffuse evenement personnalisé, page chargée

 $j.event.trigger({
			type: "pageLoaded",
            message: $j(this).attr("src"),
            time:    new Date()

		});















});







  //$j("#bt-structure1" ).attr("data-active","false") ;
showStructure();



 // addEditableBox();
    });
//<--



    $j("body").append('<input class="rename_input" style="display:none;position:absolute;top:0px;left:0px;height:20px;font-size:12px;padding-right:0px;border:1px dotted red;padding-left:5px" type="text"  >');

   $j("body").append('<div class="flex_menu flex-container-row flex_wrap_wrap" style="display:none;position:absolute;top:0px;left:0px;box-sizing: border-box;height:32px;width:auto; border: 0px solid grey; padding: 0px;opacity:1;  background-color: lightgrey"></div>');
    var p =(parseInt($j(window).height())-150)+"px";
     $j("#fil_ariane").append('<div style="position:absolute;top:30px;width:100%;min-height:35px;"><div id="redim-code"  style="width:100px;text-align:center;border-radius:10px;height: 100px;padding-top:Opx;font-size:14px;margin-left: auto;margin-right:150px;background-color:#6CDFEA;z-index:999999999;"></div>')

  //   $j("#coda").css("height","0px")
    // $j("#coda").css("min-height","0px")

//-----------affiche l'interface----------------------------
res() ;
redim_panel();


$j( "input" ).focusin(function() {
     focused_element = $j( this ).attr("id");

});



//menu contextuel background image
       $j("#img_couverture1").on("click",function(){


var im="";
var elem = "#"+wdc_selected;
        $j("#myIFrame").contents().find(elem).removeClass("background-size-default background-size-contain background-size-cover");
        $j("#myIFrame").contents().find(elem).addClass("background-size-default");

    });
        $j("#img_couverture2").on("click",function(){


var im="";
var elem = "#"+wdc_selected;
        $j("#myIFrame").contents().find(elem).removeClass("background-size-default background-size-contain background-size-cover");
        $j("#myIFrame").contents().find(elem).addClass("background-size-contain");

    });
        $j("#img_couverture3").on("click",function(){


var im="";
var elem = "#"+wdc_selected;
        $j("#myIFrame").contents().find(elem).removeClass("background-size-default background-size-contain background-size-cover");
        $j("#myIFrame").contents().find(elem).addClass("background-size-cover");

    });
          $j("#img_origin1").on("click",function(){


var im="";
var elem = "#"+wdc_selected;
        $j("#myIFrame").contents().find(elem).removeClass("background-position-default background-position-center ");

        $j("#myIFrame").contents().find(elem).addClass("background-position-default");

    });
            $j("#img_origin2").on("click",function(){


var im="";
var elem = "#"+wdc_selected;
        $j("#myIFrame").contents().find(elem).removeClass("background-position-default background-position-center ");

        $j("#myIFrame").contents().find(elem).addClass("background-position-center");

    });
 //menu contextuel FLEXBOX


               $j(".flexprop").on("click",function(){
           if($j(".flx").css("width") == "0px"){
               $j(".flx").css("width","auto");
           }else{
               $j(".flx").css("width","0px");
           }

        })

            $j(".bkgrndimg-ico").on("click",function(){
           if($j(".bkgrndimg").css("width") == "0px"){
               $j(".bkgrndimg").css("width","auto");
           }else{
               $j(".bkgrndimg").css("width","0px");
           }

        })



    $j("#flex_wrap").on("click",function(){

 alert("www")
var im="";
var elem = "#"+wdc_selected;
        $j("#myIFrame").contents().find(elem).removeClass("flex-wrap-wrap flex-wrap-nowrap");

        var state = $j(".flexwrap").attr("data-display");
        if(state == "wrap"){
            im = 106;

               $j(this).html('<img class="flexwrap" data-display = "nowrap" style="cursor:pointer;position:relative;margin-left:-2px;" src="./assets/icones/flexbox/bande'+im+'.png">'  );

                $j("#myIFrame").contents().find(elem).addClass("flex-wrap-nowrap");

        }else{
             im = 105;

               $j(this).html('<img class="flexwrap" data-display = "wrap" style="cursor:pointer;position:relative;margin-left:-2px;" src="./assets/icones/flexbox/bande'+im+'.png">'  );
            $j("#myIFrame").contents().find(elem).addClass("flex-wrap-wrap");

        }
    });





     $j("#flex_stretch").on("click",function(){


var im="";
var elem = "#"+wdc_selected;
        $j("#myIFrame").contents().find(elem).removeClass(" flex-child-grow flex-child-default");

        var state = $j(this).find("img").attr("data-display");
        if(state == "default"){
            im = 127;
            $j(this).empty();
               $j(this).append('<img class="flexstretch" data-display = "stretch" style="cursor:pointer;position:relative;margin-left:-2px;" src="./assets/icones/flexbox/bande'+im+'.png">'  );

                $j("#myIFrame").contents().find(elem).addClass("flex-child-grow");

        }else{
             im = 128;
            $j(this).empty();
               $j(this).append('<img class="flexstretch" data-display = "default" style="cursor:pointer;position:relative;margin-left:-2px;" src="./assets/icones/flexbox/bande'+im+'.png">'  );
            $j("#myIFrame").contents().find(elem).addClass("flex-child-default");

        }
    });






    $j("#flex_axe1").on("click",function(){
      $j(".flex_menu").css("display","block");
        var offset = $j(this).offset();
    $j(".flex_menu").empty() ;
        $j(".flex_menu").css("left",offset.left+0 );
        $j(".flex_menu").css("top",offset.top+0 );
                var direction =   $j("#flex_direction").find(".flexpos").attr("data-display")
        var A =  ["flex-justify-content-start", "flex-justify-content-center","flex-justify-content-end","flex-justify-content-space-around","flex-justify-content-space-between"];
        var ligne = "";
        for (i=0;i<5;i++){
          ligne += '<div class="flex_x1 '+direction+' '+A[i]+'   " data-display="'+A[i]+'" style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"><div style="height:7px;width:7px;background-color:#6CDFEA;"></div><div style="height:7px;width:7px;background-color:grey"></div><div style="height:7px;width:7px;background-color:lightgrey"></div></div>'

        }
         $j(".flex_menu").append('<div class="flex-container-row" >'+ligne+'</div>');



         $j(".flex_x1").on("click",function(){
            $j("#flex_axe1").empty();
              $j("#flex_axe1").append($j(this));
        //  $j("#flex_axe1").css("margin-right","10px")

                 var elem = "#"+wdc_selected;
             if(elem != "#"){
             var x1 =   $j(this).attr("data-display")
                     $j("#myIFrame").contents().find(elem).removeClass(" flex-justify-content-start flex-justify-content-center flex-justify-content-end flex-justify-content-space-around flex-justify-content-space-between");
                $j("#myIFrame").contents().find(elem).addClass(x1);
                 affiche_arbre_dom();
             }


            $j(".flex_menu").css("display","none");
        })

    })

       $j("#flex_axe2").on("click",function(){
      $j(".flex_menu").css("display","block");
        var offset = $j(this).offset();
    $j(".flex_menu").empty() ;
        $j(".flex_menu").css("left",offset.left+0 );
        $j(".flex_menu").css("top",offset.top+0 );
               var direction =   $j("#flex_direction").find(".flexpos").attr("data-display")
         var x1 =   $j("#flex_axe1").find(".flex_x1").attr("data-display")
        var A =  ["flex-align-items-start", "flex-align-items-center","flex-align-items-end","flex-align-items-stretch"];
        var ligne = "";
        for (i=0;i<4;i++){
          ligne += '<div class="flex_x2 '+direction+' '+x1+' '+A[i]+'  " data-display="'+A[i]+'"  style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"><div style="min-height:7px;min-width:7px;background-color:#6CDFEA;"></div><div style="min-height:7px;min-width:7px;background-color:grey"></div><div style="min-height:7px;min-width:7px;background-color:lightgrey"></div></div>'

        }
         $j(".flex_menu").append('<div class="flex-container-row" >'+ligne+'</div>');

         $j(".flex_x2").on("click",function(){
            $j("#flex_axe2").empty();
              $j("#flex_axe2").append($j(this));




                 var elem = "#"+wdc_selected;
             if(elem != "#"){
             /*
             flex-container-column-reverse flex-container-row-reverse flex-container-column flex-container-row flex-justify-content-start flex-justify-content-center flex-justify-content-end flex-justify-content-space-around flex-justify-content-space-between*/
                 var x2 =   $j(this).attr("data-display")
                     $j("#myIFrame").contents().find(elem).removeClass(" flex-align-items-start flex-align-items-center flex-align-items-end flex-align-items-stretch");
                $j("#myIFrame").contents().find(elem).addClass(x2);

                 affiche_arbre_dom()
                }

            $j(".flex_menu").css("display","none");
        })

    })
      //-------flex multiline align content





          $j("#flex_wrap_mode").on("click",function(){
      $j(".flex_menu").css("display","block");
        var offset = $j(this).offset();
    $j(".flex_menu").empty() ;
        $j(".flex_menu").css("left",offset.left+0 );
        $j(".flex_menu").css("top",offset.top+0 );
        var A =  ["flex-align-content-start", "flex-align-content-center","flex-align-content-end", "flex-align-content-space-between" ,"flex-align-content-space-around","flex-align-content-stretch"];
        var ligne = "";
        for (i=0;i<6;i++){
          ligne += '<div class="flex_xcontent flex-container-row flex-wrap-wrap '+A[i]+' " data-display="'+A[i]+'"  style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"><div style="min-height:7px;min-width:7px;background-color:#6CDFEA;"></div><div style="min-height:7px;min-width:7px;background-color:grey"></div><div style="min-height:7px;min-width:7px;background-color:lightgrey"></div><div style="min-height:7px;min-width:7px;background-color:grey"></div><div style="min-height:7px;min-width:7px;background-color:lightgrey"></div><div style="min-height:7px;min-width:7px;background-color:black"></div></div>'

        }


        $j(".flex_menu").append('<div class="flex-container-row" >'+ligne+'</div>');
        $j(".flex_xcontent").on("click",function(){
        $j("#flex_wrap_mode").empty();
        $j("#flex_wrap_mode").append($j(this));




                 var elem = "#"+wdc_selected;
             if(elem != "#"){

               var x2 =   $j(this).attr("data-display")
                     $j("#myIFrame").contents().find(elem).removeClass(" flex-align-content-center flex-align-content-start flex-align-content-end  flex-align-content-space-between flex-align-content-space-around flex-align-content-stretch");
                $j("#myIFrame").contents().find(elem).addClass(x2);

                 affiche_arbre_dom()
                }

            $j(".flex_menu").css("display","none");
        })

    })


    //end align items


    $j("#flex_direction").on("click",function(){

        var offset = $j(this).offset();
    $j(".flex_menu").empty() ;

    var im="";
        var direction="";
        for (i=15;i<19;i++){
            switch(i){
                case 15:
                    direction = "flex-container-column"

               im="column"
                    break;
                    case 16:
                     direction = "flex-container-column-reverse"
                im="column_reverse"
                    break;
                    case 17:
                     direction = "flex-container-row"
                im="row"
                    break;
                    case 18:

                     direction = "flex-container-row-reverse"
                 im="row_reverse"

                    break;
            }

           $j(".flex_menu").append('<img class="flexpos"  " data-im = "'+im+'" data-display="'+direction+'" style="cursor:pointer;position:relative;margin-left:-2px;" src="./assets/icones/flexbox/bande'+i+'.png">'  );
              $j(".flex_menu").css("display","block");
               $j(".flex_menu").css("left",offset.left+0 );
        $j(".flex_menu").css("top",offset.top+0 );
        }

    // $j.each(".flexpos",function(){

        $j(".flexpos").on("click",function(){
            $j("#flex_direction").empty();
              $j("#flex_direction").append($j(this));

                  var elem = "#"+wdc_selected;
             if(elem != "#"){

                     $j("#myIFrame").contents().find(elem).removeClass("flex-container-row flex-container-row-reverse flex-container-column flex-container-column-reverse flex-justify-content-start flex-justify-content-center flex-justify-content-end flex-justify-content-space-around flex-justify-content-space-between flex-align-items-start flex-align-items-center flex-align-items-end flex-align-items-stretch");
                $j("#myIFrame").contents().find(elem).addClass($j(this).attr("data-display"));
                 var img = "../../../system/assets/interface/wdc_"+$j(this).attr("data-im")+".png";
                $j("#myIFrame").contents().find(elem+ " > .wdc_label_structure > .dir_ico").attr("src",img)

                            $j("#flex_axe1").empty();
       $j("#flex_axe1").append('<div class="flex_x1 '+direction+'  " data-display="" style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"></div>'  );
               $j("#flex_axe2").empty();
       $j("#flex_axe2").append('<div class="flex_x2 '+direction+'   " data-display="" style="position:relative;margin-left:-2px;border: 2px solid black;width:28px;height:28px;opacity:1;background-color:white;cursor:pointer"></div>'  );
                 affiche_arbre_dom()
                }
            $j(".flex_menu").css("display","none");
        })
  //   })


    })

          $j( ".props" ).dialog({
  title: "Propriétés",
              height: 550,
              width:350,
              minWidth:350
});
          $j(".props").parent().attr("id","modal_props")
                    $j( ".tools" ).dialog({
  title: "Tools"
});
          $j(".props").css("overflow","hidden")
                  $j(".tools").css("overflow","hidden")
            $j(".tools").parent().attr("id","modal_tools")

                      $j("#modal_props").css("display","none");


           $j("#modal_tools").css("display","none");





//---------------activation des composants-------------- -

//-----composant coda editeur de code ACE_EDITOR
//ace.require('ace/ext/beautify');

  /* editorAce = ace.edit("coda");

   // editor.setTheme("ace/theme/chrome");
    editorAce.setTheme("ace/theme/chrome");
    editorAce.getSession().setMode("ace/mode/php");

    editorAce.getSession().setUseWrapMode(true);


    editorAce.scrollPageUp();
    editorAce.clearSelection();






  //affiche le code HTML dans l'éditeur ACE

$j("#code").on("click",function(){
editorType ="code";
    $j("#acedit").css("min-height","300px")
             editorAce.resize();
                      editorAce.scrollPageUp()



});
    $j("#sql").on("click",function(){
editorType ="sql";
    $j("#acedit").css("min-height","300px")
      editorAce.getSession().setMode("ace/mode/sql");
             editorAce.resize();
                      editorAce.scrollPageUp()



});

   //ace_save


  $j("#ace_save").on("click",function(){

    switch(editorType){
    case "sql":


        var code = editorAce.getValue();
             code=code.replace(/\n|\r|(\n\r)/g,' ');


              var scriptPhp = "../php/saveSQL.php";
 $j.ajax(

            {
                url: scriptPhp,
                type: "POST",
               dataType : 'text',
                data: {
                    name: editedFilename,
                    contenu : code
                },
                success: function(rep) {
                    if(rep=="ok"){

                           alert("Sauvegarde du fichier SQL réussie");
                    }

                }
            });







    break;



      }



});

    */


    init_ace_editor();

    /*
 $j("#css_local").on("click",function(){
editorType ="css_local";
    $j("#acedit").css("min-height","100px")
    // $j.get("../system/wdc/systemcss.css", function(cssContent){
    //alert("My CSS = " + cssContent);
               editorAce.getSession().setMode("ace/mode/css");


   var parser;
var parsed;
parser = docCSS["page_custom"].parser;
parsed = docCSS["page_custom"].parsed;

    var cssContent =    parser.getCSSForEditor(parsed)

    editorAce.setValue(cssContent)
             editorAce.resize();
                      editorAce.scrollPageUp()

    // })

});

 $j("#css_global").on("click",function(){
editorType ="css_global";
    $j("#acedit").css("min-height","100px")
     $j.get(site_css, function(cssContent){
    //alert("My CSS = " + cssContent);
               editorAce.getSession().setMode("ace/mode/css");

   var parser;
var parsed;
parser = docCSS["site_custom"].parser;
parsed = docCSS["site_custom"].parsed;

    var cssContent =    parser.getCSSForEditor(parsed)

    editorAce.setValue(cssContent)
             editorAce.resize();
                      editorAce.scrollPageUp()

     })

});











 $j("#masquer").on("click",function(){

    $j("#acedit").css("min-height","0px")
             editorAce.resize();
                      editorAce.scrollPageUp()



});








    })
   $j("#bt-saveAs").on('click', function(e) {
       editorType ="systemcss";
    //   var L = L.load( "../system/wdc/systemcss.css" );
       $j.get("../system/wdc/systemcss.css", function(cssContent){
    //alert("My CSS = " + cssContent);
               editorAce.getSession().setMode("ace/mode/css");
           editorAce.setValue(cssContent)
});


     //  alert(L)
        //console.log(elemSelected)
     // var ele = $j("#myIFrame").contents().find("#"+elemSelected);
    //    ele[0].outerHTML = editorAce.getValue()
    //   editorAce.setValue(ele[0].outerHTML);
    // e.type, etc
});


    //$j(".ace_text-input").css("width","300");
  //  editor.resize();

  */

//-----composant infobulle

   $j('.tooltip').tooltipster({theme: 'tooltipster-shadow'});




    //wdc_calques_arbo
    //wdc_calques_liste
 //    $j( "#wdc_arbo-calques")
 //    $j( "#wdc_liste-calques")

//charge page


  // chargePage(name);

    /*

// slider zoom ----
    $j( "#zoom-slider" ).slider({

      step: 10,
      min: 10,
      max: 300,
      value: 100,

    change: function( event, ui ) {
$j("#panel_edit_center").css("transform","scale(" + ui.value/100 + ")");

      var newH= parseInt($j("#panel_edit_center").css("height"))+(ui.value/90)

     $j("#panel_edit_center").css("height",newH);
   if(ui.value ==100){
       $j("#panel_edit_center").css("height",$j("#myIFrame").contents().find("#wdc-content").height());
   }
     },
         slide: function( event, ui ) {
$j("#panel_edit_center").css("transform","scale(" + ui.value/100 + ")");
     var newH= parseInt($j("#panel_edit_center").css("height"))+(ui.value/80)

     $j("#panel_edit_center").css("height",newH);
    if(ui.value ==100){
       $j("#panel_edit_center").css("height",$j("#myIFrame").css("height"));
   }
     }

    }).slider("pips",{rest:"label",labels:["10%","","","","","","","","","100%","","","","","","","","","","200%","","","","","","","","","","300%"]}).slider("float",{suffix:" %"});

    $j(".ui-slider-handle").css({"width":"20px","height":"8px" });
    $j(".ui-slider-tip").css({"width":"50", "font-weight":"bold",backgroundColor:"lightYellow"});

//slider end

//------------zoom avant

 $j("#zoom-plus").click(function(){
     var v = $j("#zoom-slider").slider( "value");
     if(v < 300){
       v = v+10;
     }
     $j("#zoom-slider").slider( "value", v );
 })
 $j("#zoom-moins").click(function(){
     var v = $j("#zoom-slider").slider( "value");
     if(v > 10){
       v = v-10;
     }
     $j("#zoom-slider").slider( "value", v );
 })

 //---------------------hide -show panels
$j("#code").click(function(){
var h = parseInt($j(".site-content").css("height"));
    $j(".code_center").css("display","block");

$j(".edit_center").css("display","none");
$j(".code_center").css("height",h-2);
  editor.resize();
});


$j("#apercu").click(function(){

   // toggleFullScreen();
var h = parseInt($j(".site-content").css("height"));
    $j(".edit_center").css("display","block");
$j(".code_center").css("display","none");
$j(".edit_center").css("height",h-2)
editor.resize();

  //  $j("#myIFrame").contents().find("#"+elemSelected).html(editor.getValue());

    var obj =   $j("#myIFrame").contents().find("#"+elemSelected).html(editor.getValue());
    // obj[0].outerHTML = editor.getValue();


});
 */
 //-------------------fin show code panel



function init_tools(){
//element possédant le focus
focused_element =null;
//element selectionne dans le DOM  jquery
selectedElement = null;
//liste des composants disponible
components_list = [];
//containeur de l'élément selectionné
wdc_selectedContaineur = null;
//epaisseur du contour de l'objet
borderProp = 0;

//siteDirectory
    siteDirectory = "";

//chargement du panneau outils
getTools();

        $j( "#tabs" ).tabs();

}


//redim panels


function redim_panel(){




//$j(".redim-code").css("display","none");


    $j("#redim-code").on("dblclick",function(){

        if(parseInt($j("#acedit").css("min-height")) < 10){


             $j("#acedit").css("min-height","300px")

              /*        editorAce2.resize();
                               editorAce2.scrollPageUp()
                               editorAce.resize();
                                        editorAce.scrollPageUp()*/

        }else{


             $j("#acedit").css("min-height","0px")


              /*        editorAce2.resize();
                               editorAce2.scrollPageUp()

                                                     editorAce.resize();
                                                              editorAce.scrollPageUp()*/
        }





    })


$j("#redim-code").mousedown(function(e){
 $j("body").css("cursor","ns-resize");
     down = true;
 redim_code = true;
}).mouseup(function() {
     $j("body").css("cursor","ns-resize");
 redim_code = false;
});


   $j( window ).on( "mousemove", function( event ) {
       if(redim_code  && down  ){
         //  console.log(redim_code+"|"+down);

           var wh = (parseInt($j(window).height())-event.pageY)
           if(wh >= 0 ){

               var p = wh-50+"px"
             $j("#acedit").css("min-height",p)

						myEditor.setSize(null,"100%")
						 myEditor_css_page.setSize(null,"100%")
						 myEditor_css_insite.setSize(null,"100%")
						 myEditor_css_allsite.setSize(null,"100%")
						 myEditor_js_page.setSize(null,"100%")
						 myEditor_sql.setSize(null,"100%")
          /*   editorAce.resize();
                      editorAce.scrollPageUp()
                      editorAce2.resize();
                               editorAce2.scrollPageUp()*/

           }

       }
 // $( "#log" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY );
});


    /*

$j(".redim-left").draggable({
axis: "x",
cursor: "move",
containment: "parent",
drag: function( event, ui ) {

$j("#leftzone").css("width",ui.position.left+10);
*/
//redim center
//res();
    /*
     }
});

$j(".redim-right").draggable({
axis: "x",
cursor: "move",
containment: [ $j.wdc_Interface_RedimRightLimit1, 0,$j.wdc_Interface_RedimRightLimit2, 2000 ],
drag: function( event, ui ) {
var rz =  parseInt($j("#rightzone").css("width"));
    var lz =  parseInt($j("#leftzone").css("width"));
    var p_largeur = parseInt(pageWidth());
   var newrz = (ui.position.left)-lz;
    var rz = p_largeur - (newrz+lz);

$j("#centerzone").css("width",newrz);
    $j("#rightzone").css("width",rz);

    $j(".redim-code").css("margin-left",(newrz/2)-20);


//redim center

     }
});

*/
};



//$j('#item-id').draggable( "destroy" )
    //$j('#item-id').draggable( "disabled" )

 //test spinner





   ///////////////////////////////////

   ///////////////////////////////////////////////////////////////////////////////////
//
//            barre d'outils - infos
//
///////////////////////////////////////////////////////////////////////////////////


    //---on select affiche les propriétés

    initMeasureInput("optionsL","spinnerWidth",getObjectRealWidth,setObjectRealWidth)   ;
    initMeasureInput("optionsH","spinnerHeight",getObjectRealHeight,setObjectRealHeight)   ;
    initMeasureInput("optionsMinL","spinnerMinWidth",getObjectRealMinWidth,setObjectRealMinWidth)   ;
    initMeasureInput("optionsMinH","spinnerMinHeight",getObjectRealMinHeight,setObjectRealMinHeight)   ;
    initMeasureInput("optionsMaxL","spinnerMaxWidth",getObjectRealMaxWidth,setObjectRealMaxWidth)   ;
    initMeasureInput("optionsMaxH","spinnerMaxHeight",getObjectRealMaxHeight,setObjectRealMaxHeight)   ;













    var spinner = $j("#spinnerLeft" ).spinner();
   spinner.spinner({
  spin: function( event, ui ) {
  $j("#myIFrame").contents().find("#"+elemSelected).css("left",ui.value+"px");
     document.getElementById('myIFrame').contentWindow.ajusteBox("#"+elemSelected);
  }
})
      $j("#spinnerLeft").on( "keydown", function( event ) {
          $j("#myIFrame").contents().find("#"+elemSelected).css("left",$j(this).val()+"px");
     document.getElementById('myIFrame').contentWindow.ajusteBox("#"+elemSelected);
        })



    $j(document).on("selectObject1.spinnerLeft",function(e){

         var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var dimension = win.getElementById(e.obj).style.left ;

            if(dimension == null || dimension == 'undefined' || dimension==""){
      //   alert('none')
 win.getElementById(e.obj).style.left = "0px";
      dimension = "0px"
        }



        //$j("#myIFrame").contents().find("#"+obj).css("left");

        $j("#spinnerLeft").val(parseInt(dimension));

    });





  var spinner = $j("#spinnerTop" ).spinner();
   spinner.spinner({

  spin: function( event, ui ) {

  $j("#myIFrame").contents().find("#"+elemSelected).css("top",ui.value+"px");


       document.getElementById('myIFrame').contentWindow.ajusteBox("#"+elemSelected);

       //document.getElementById('myIFrame').contentWindow.ajusteBox("#"+elemSelected);
  }
});



     $j("#spinnerTop").on( "keydown", function( event ) {
          $j("#myIFrame").contents().find("#"+elemSelected).css("top",$j(this).val()+"px");
     document.getElementById('myIFrame').contentWindow.ajusteBox("#"+elemSelected);
        })



        $j(document).on("selectObject1.spinnerTop",function(e){


         var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var dimension = win.getElementById(e.obj).style.top ;


                        if(dimension == null || dimension == 'undefined' || dimension==""){

 win.getElementById(e.obj).style.left = "0px";
      dimension = "0px"
        }
        $j("#spinnerTop").val(parseInt(dimension));

    });


//Largeur



function initMeasureInput(selectName,spinnerName,getRealM,setRealM){


 //A la selection d'un objet récupère les propriétés.

    $j(document).on("selectObject1."+spinnerName,function(e){

          var dimension = getRealM(e.obj)
     //  alert(dimension);
         console.log("dim::"+dimension);


        if(dimension == null || dimension == 'undefined' || dimension==""){

         // var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
//win.getElementById(e.obj).style.minWidth = "none";
            dimension = "";
        }
          var W = parseInt(dimension);
           var dim = W.toString().length;
           var unit = dimension.substr(dim);
          if(dimension == "auto"){
               unit = "auto";
                $j("#"+spinnerName).val("");
          }else if(dimension == ""){

               unit = "auto";
                $j("#"+spinnerName).val("");
          } else{

                $j("#"+spinnerName).val(W);
          }

    parent.top.$j("#"+selectName).val(unit).selectmenu("refresh");
    });





//initialise le spinner

  var spinner = $j("#"+spinnerName ).spinner();
   spinner.spinner({
       min:0,
  spin: function( event, ui ) {
         var V =    $j( "#"+selectName ).val();
      //console.log(spinnerName);
         //    $j("#myIFrame").contents().find("#"+elemSelected).css("width",ui.value+V);
          setRealM(elemSelected,ui.value+V)

       document.getElementById('myIFrame').contentWindow.ajusteBox("#"+elemSelected);

  }
});


   $j("#"+spinnerName ).on( "keydown", function( event ) {
           var V =    $j( "#"+selectName ).val();
       setRealM(elemSelected,$j(this).val()+V)
      //    $j("#myIFrame").contents().find("#"+elemSelected).css("top",$j(this).val()+"px");
     document.getElementById('myIFrame').contentWindow.ajusteBox("#"+elemSelected);
        })


//initialise le menu
 $j( "#"+selectName ).selectmenu({
     create: function( event, ui ) {
   //  $j(this).attr("data-clickOnMe" ,"false");
         this.clickOnMe = false;
     },

      open: function( event, ui ) {
      this.clickOnMe = true;
// $j(this).attr("data-clickOnMe" ,"true");
 },
    select: function (event, ui) {
             var val = "";
        var  val = $j(this).val();


        if(  this.clickOnMe ){
             this.clickOnMe = false;
            // $j(this).attr("data-clickOnMe" ,"false");

     var objL =  parseInt(getRealM(elemSelected));

      var dim = objL.toString();

        ajustMeasureUnit(spinnerName,dim,val,setRealM);

            }

        }

  // document.getElementById('myIFrame').contentWindow.ajusteBox("#"+elemSelected);

 }
 );


}


    //opacité

  var spinner = $j("#spinnerOpacity" ).spinner();
   spinner.spinner({
         max: 1,
       min:0,
        step: 0.1,
      numberFormat: "n",
  spin: function( event, ui ) {

     $j("#myIFrame").contents().find("#"+elemSelected).css("opacity",ui.value);

  }
});


$j( "input" ).focusin(function() {
      $j(this).css("background-color","#80e5ed");

});
    $j( "input" ).focusout(function() {
      $j(this).css("background-color","white");

});

    //---fin prop pos et taille

///////////////////////////////////////////////////////////////////////////////////
//
//             Onglet ->  TAB affiche la liste des calques
//
///////////////////////////////////////////////////////////////////////////////////

//génération arbre dom

 function ajustMeasureUnit(input,dim,unit,setRealM){
     console.log(input+"--"+dim+"--"+unit);
    var val ="";

     switch (unit){

     case "auto":
                 $j("#"+input ).val("");
                 val = "";
    break;
              case "none":
                 $j("#"+input ).val("");
                 val = "";
    break;
            case "%":
                 $j("#"+input ).val(100);
             dim=100;
                 val = dim+unit;
    break;
                 case "px":
                 $j("#"+input ).val(100);
             dim=100;
                 val = dim+unit;
    break;
                 case "em":
                 $j("#"+input ).val(3);
             dim=3
                 val = dim+unit;
    break;



     }
            // alert(val);
          setRealM(elemSelected,val);



 }



    function getObjectRealWidth(obj){
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.width;



return form ;
}
function getObjectRealMinWidth(obj){
     console.log("obj1:"+obj);
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.minWidth;
return form ;
}
function getObjectRealHeight(obj){
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.height;
return form
}
function getObjectRealMinHeight(obj){
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.minHeight;
return form
}
    function getObjectRealMaxHeight(obj){
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.maxHeight;
return form
}
    function getObjectRealMaxWidth(obj){
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.maxWidth;
return form
}

function setObjectRealWidth(obj,w){


 //var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
//var form = win.getElementById(obj).style.width = w;
    console.log(w);
 $j("#myIFrame").contents().find("#"+obj).css("width",w);
}
function setObjectRealMinWidth(obj,w){
   // console.log("obj:"+w);

        //$j("#myIFrame").contents().find("#"+obj).css("minWidth",w);

 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.minWidth = w;

}
function setObjectRealHeight(obj,h){
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.height = h;

}
function setObjectRealMinHeight(obj,h){
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.minHeight = h;

}

 function setObjectRealMaxHeight(obj,h){
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.maxHeight = h;

}

    function setObjectRealMaxWidth(obj,h){
 var win = document.getElementById('myIFrame').contentWindow.document; // reference to iframe's window
var form = win.getElementById(obj).style.maxWidth = h;

}















////////////////////////////-fin /////---> Tab liste des calques


 ///////////////////////////////////////////////////////////////////////////////////
//
//             Interface : installe les outils, onglets etc...
//
///////////////////////////////////////////////////////////////////////////////////




function getTools(){

//-----composant jqueryui tab


   // getToolsTree.php
  $j.wdcToolsLoadingQueue = [];
wdcActiveGroupId ="";
var scriptPhp = "../php/getToolsTree.php";
 $j.ajax(

            {
                url: scriptPhp,
                type: "POST",
                dataType: 'json',
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function(rep) {

				var obj = JSON.parse(rep);
//console.log("--->"+my_object[2].children.length)
                   // console.log(obj);
//affiche_panel_tools_composants(obj);
            $j.each( obj, function( key, value ){
            var  wdcToolsChem =  this.dir+"/"+this.src

//key =index;
//value = objet;
//console.log( key + ": " + this.name +"--"+this.children.length);
                $j.wdcChildren = this.children.length;
               //    console.log("this.children.length"+$j.wdcChildren);
             if(this.children.length > 0){
            $j.wdcLevel1Children = this.children;
            $j.wdcLevel1lKey = key;

            }
//affichage du niveau 0 : onglet, icone
if(this.type == "htm"){
    $j("#tabs").append('<div id ="tabs-'+key+'" style="display:flex;flex-direction: column;overflow-y:auto"></div>');


  $j.currentTargetName  = "#tabs-"+key;
    $j.wdcToolsLoadingQueue.push({"fileType":this.type,"url": this.dir+"/"+this.src+".htm","target":$j.currentTargetName});



          }
    if(this.type == "xml"){


    $j("#tabs").append('<div id ="tabs-'+key+'" style="display:flex;flex-direction: column;overflow-y:auto"></div>');


  $j.currentTargetName  = "#tabs-"+key;
    $j.wdcToolsLoadingQueue.push({"fileType":this.type,"url": this.dir+"/"+this.src+".xml","target":$j.currentTargetName});



          }




 //affichage du niveau 1 : accordeon ou contenu direct


 if(this.type == "accordion"){
       $j.currentTargetName  = "#accordion-"+key;
                   $j("#tabs").append('<div id ="tabs-'+key+'" style="display:flex"><div id ="accordion-'+key+'" class="accordion" ></div></div>');



            if($j.wdcChildren != 0){

                                $j.each($j.wdcLevel1Children, function( key, value ){


                                    $j.wdcLevel2Children = this.children;
                                 //   console.log("level2Children"+this.children.length);
                              // console.log( key + ": ------>" + this.name );
                        //affiche_panel_tools_composants(currentWdcToolsLevel,key)
                     if(this.type == "htm" || this.type == "part"){
                       //  console.log("---->"+$j.currentTargetName);
               $j($j.currentTargetName).append('<h3>'+this.name+'</h3><div id="accordion-section-'+key+'" style="padding:0px;display:flex;flex-direction:column;" ></div>');
                         //charge le contenu de chaque section
              $j.wdcToolsLoadingQueue.push({"fileType":this.type,"url": this.dir+"/"+this.src+".htm","key":key,"target":"#accordion-section-"+key});
                     }
                              if(this.js){

               $j.wdcToolsLoadingQueue.push({"fileType":"js","url": this.dir+"/"+this.src+".js"});

                              }
                     $j.currentTargetName2  = "accordion-section-"+key;



                                          //charge les différentes section config niveau 2    ------------------------------
                                                            $j.each($j.wdcLevel2Children, function( key, value ){


                                                                $j.wdcLevel3Children = this.children;
                                  //  console.log("level3Children"+this.children.length);



                                       if(this.type == "htm"){

                                       $j("#"+$j.currentTargetName2).append('<div id="titre-'+key+'" style="position:relative;background-color:whitesmoke;padding:5px;font-weight:normal;font-size:14px;">&nbsp;&nbsp;>&nbsp;&nbsp; '+this.name+'</div><div id="'+$j.currentTargetName2+'_param-section-'+key+'"></div>');
                                                 //charge le contenu de chaque section
                                      $j.wdcToolsLoadingQueue.push({"fileType":this.type,"url": this.dir+"/"+this.src+".htm","key":key,"target": "#"+$j.currentTargetName2+"_param-section-"+key});


                                             }else if (this.type == "xml"){
                                        //  console.log("-------------------->"+this.src);
                                                 //charge le contenu de chaque section
                                      $j.wdcToolsLoadingQueue.push({"fileType":this.type,"url": this.dir+"/"+this.src+".xml","key":key,"target": "#"+$j.currentTargetName2});




                                             }



                                                      if(this.js){

                                       $j.wdcToolsLoadingQueue.push({"fileType":"js","url": this.dir+"/"+this.src+".js"});

                                                      }

                                             //console.log("section:"+this.name);

                                                                     if(this.type == "components" && $j.wdcLevel3Children.length > 0){

                                       $j("#"+$j.currentTargetName2).append('<div id="titre-'+key+'" style="position:relative;background-color:whitesmoke;padding:5px;margin-bottom:5px;font-weight:normal;font-size:14px">&nbsp;&nbsp;>&nbsp;&nbsp; '+this.name+'</div><div id="'+$j.currentTargetName2+'_param-section-'+key+'"></div>');
                                                 //charge le contenu de chaque section
                                      $j.wdcToolsLoadingQueue.push({"fileType":this.type,"url": this.dir+"/"+this.src+".htm","key":key,"target": "#"+$j.currentTargetName2+"_param-section-"+key});
                                                                         $j.currentTargetName3  = $j.currentTargetName2+"_param-section-"+key;

                                                       //charge les différentes composants------------------------------
                                                                            $j.each($j.wdcLevel3Children, function( key, value ){


                                                                              // if(this.type == "component"){
                                                                              // console.log("azzzzzzzzzzz:"+this.name+"--"+$j.currentTargetName3+"-css"+this.css+"-js"+this.js);
                                            $j.wdcToolsLoadingQueue.push({"fileType":"component","infos":this.infos,"name":this.name,"url": this.dir+"/"+this.src+".png","key":key,"target":"#"+$j.currentTargetName3});

                                          //liste des composants disponibles dans l'éditeur, pour charger les propriétés avec loadxmlprop
                                                                               // target tabs-3

                                             components_list.push({"name":this.name,"css":this.css,"js":this.js,"url": this.dir+"/"+this.src+".xml","target":"tabs-3"});
                                            // console.log(components_list)   ;

                                                                             //  };


                                                                            });

                                                                    //------------------fin niveau 3 -------------


                                                                      }




                                                            });

                                                    //------------------fin niveau 2 -------------

                                    })
              };








 };

 if(this.js){
          $j.wdcToolsLoadingQueue.push({"fileType":"js","url": this.dir+"/"+this.src+".js"});

             }

$j("#tabs-bts").append('<li><a href="#tabs-'+key+'" style=""><img title="'+this.name+'" src="'+wdcToolsChem+".png"+'"></a></li>');

});

//-----composant jqueryui accordeon
$j(".accordion").accordion({
      heightStyle: "fill",
      animate: 100
}).css("flex","1");

//overrride style jqueryui
//$j(".ui-tabs-anchor").css("padding","3px");
$j(".ui-accordion-header").css("padding-top","4px");
$j(".ui-accordion-header").css("padding-left","30px");
$j(".ui-accordion-header").css("padding-bottom","4px");
 $j(".ui-accordion-content").css("border","none");
                     $j(".ui-accordion-header").css("border-color","grey");
       $j(".ui-accordion-header").css("border-top-width","0px");
                     $j(".ui-accordion-header").css("border-left-width","0px");
                     $j(".ui-accordion-header").css("border-right-width","0px");

     $j(".ui-accordion-header").css("border-bottom-width","1px");

$j(".ui-accordion-header").css("font-weight","bold");
$j(".ui-accordion-header").css("font-size","16px");




           $j.each( $j.wdcToolsLoadingQueue, function( key, value ){
               // $j.queueTarget = this.target;
   //console.log(this.fileType +"------------------"+ this.url+ "--"+this.target);
                switch (this.fileType) {
              case "htm":
              case "accordion":
              case "xml":

            this.url =  this.url.replace(".xml","_fr.xml");
              loadExternalData(this.url,this.target,this.fileType);

              break;

              case "js":
                 $j.getScript( this.url,function() { });
              break;

              case "component":

               $j(this.target).append('<span id='+this.name+'-'+this.key+' style="padding-left:5px;padding-right:5px"><img class="wdcbt "  src="'+this.url+'"></spans>');
                        //  $j("#"+this.name+'-'+this.key).tooltipster({theme: 'tooltipster-shadow'});


              $j("#"+this.name+'-'+this.key).jBox('Mouse',{
    content: this.infos,
                  maxWidth:300
  });


              //click sur un composant ajoute un composant
               $j("#"+this.name+'-'+this.key).click(function(){

                loadExternalData($j(this).find("img").attr("src"),"","component",this.css);
               //  $j("#myIFrame").contents().find("#"+elemSelected).append(data);

               });





                        break;

            }



           });


  //  console.log($j.wdcToolsLoadingQueue);

                }
            }
        );

}//fin getTools;












    //loading indique si on ecoute le chargement de la page ou non pour recupérer les propriétés
function loadExternalData(url,elem,fileType,loading,componentCss) {

  switch (fileType) {

    case "xml":
          loadXmlProp(url,elem,"xml",loading);

        //recharge les outils et prop lors de la selection d'un element




     break;


////////////////////////////////
//    ajoute un composant   sur le document  component
////////////////////////////////


    case "component":
          url =  url.replace("png","des");
           urlxml =  url.replace("png","xml");
          //components_list.push(urlxml);
//alert(componentCss);
//addStSheet();



     $j.ajax({
     type: "GET",
     url: url,
     success: function(data) {
       var t = data;
         var newid = wdc_getUniqueId();
         t= t.split("-wdcid").join(newid);
         var newElement = $j(t);

       //  newElement.attr("id",newElement.attr("data-wdctype")+wdc_getUniqueId());
          //    newElement.attr("id",newElement.attr("data-wdctype"));

          //newElement.attr("chemin","");
         var elem2 = "#"+newElement.attr("id");
//console.log("ajouter"+wdc_selectedContaineur);
       $j("#myIFrame").contents().find("#"+elemSelected).append(newElement);
         var elem3 = $j("#myIFrame").contents().find(elem2);

         if($j("#bt-viewblocks").attr("data-active")=="true"){
                           elem3.each(function(){
                                    $j(this).addClass("structure");

                                var m = 0;
                               m = parseInt($j(this).css("margin-top"));
                               m= m+15;
                               $j(this).css("margin-top",m+"px");
                                    m = parseInt($j(this).css("margin-left"));
                               m= m+15;
                                $j(this).css("margin-left",m+"px");
                                    m = parseInt($j(this).css("margin-bottom"));
                               m= m+15;
                                $j(this).css("margin-bottom",m+"px");
                                    m = parseInt($j(this).css("margin-right"));
                               m= m+15;
                                $j(this).css("margin-right",m+"px");


                           })

        }





         init_elem(elem3);
      //  document.getElementById('myIFrame').contentWindow.ajusteBox(elem2);

           $j('.tooltip1').tooltipster({theme: 'tooltipster-shadow'});
         wdc_affiche_calques("#"+elemSelected,true);
affiche_arbre_dom();

     }
  });


                    break;
              default:

    $j.ajax({
     type: "GET",
     url: url,
     success: function(data) {
        //   console.log("loadddddd"+url);
         $j(elem).append(data);
     }
  });


  };


} ;


function affiche_panel_tools_composants(obj,key){
//console.log(obj.attr("id"));
         switch (this.type) {
              case "htm":
                    break;
              case "xml":
                    break;
            case "accordion":
                // $j("#tabs-bts").append('<div id="accordion-'+key+'"></div>');

                    break;



            }



}
    //clic sur la section "bloc principal"
    $j("#ui-id-2").on("click",function(){
     var       elem = "wdc-content";
       // alert("bloc");
          parent.top.diffuseEvent("selectObject1",elem);



        parent.top.elemSelected = elem;
       parent.top.affiche_chemin("#"+elem);
    })

 //--------------------bouton haut------------

    $j(".wdcswitcher").on("click",function(){


      if($j(this).css("opacity")=="0.5") {

          $j(this).css("opacity","1")

      } else {
          $j(this).css("opacity","0.5")

      }


    })
    $j("#bt-copyPage" ).click(function() {
var d = document.getElementById('myIFrame').contentWindow.document.getElementById("wdc-content").innerHTML;
copyObject = d;


    });
    $j("#bt-pastePage" ).click(function() {
var d = document.getElementById('myIFrame').contentWindow.document.getElementById("wdc-content").innerHTML = copyObject;
    });

      $j("#bt-copyObj" ).click(function() {
var d = document.getElementById('myIFrame').contentWindow.document.getElementById(elemSelected);
copyObject = d;


      });

      $j("#bt-pasteObj" ).click(function() {
            var d1 = copyObject.outerHTML;
            var id= copyObject.getAttribute("data-wdcuid")
     var uid = wdc_getUniqueId();
//console.log("paste"+uid+id)
d1 = d1.split(id).join(uid);



         $j("#myIFrame").contents().find("#"+elemSelected).append(d1)
          var elem = '[data-wdcuid="'+uid+'"]'
                   var elem3 = $j("#myIFrame").contents().find(elem);


$j("#myIFrame").contents().find(elem).find("[data-wdcuid]").each(function(){
var uid = wdc_getUniqueId();
	var oldUid = $j(this).attr("data-wdcuid");
	var oldId = $j(this).attr("id");
	var newId = oldId.replace(oldUid,uid);
	$j(this).attr("data-wdcuid",uid);
	$j(this).attr("id",newId);
})



     /*      if($j("#bt-viewblocks").attr("data-active")=="true"){
          m = parseInt(elem3.css("margin-top"));
          m = (m+15);
           elem3.css('margin-top',m+"px");



           m = parseInt(elem3.css("margin-left"));
          m = (m+15);
         elem3.css('margin-left',m+"px");




         m = parseInt(elem3.css("margin-bottom"));
          m = (m+15);
           elem3.css('margin-bottom',m+"px");



      m = parseInt(elem3.css("margin-right"));
          m = (m+15);
          elem3.css('margin-right',m+"px");

          }*/




         init_elem(elem3);
      //  document.getElementById('myIFrame').contentWindow.ajusteBox(elem2);

           $j('.tooltip1').tooltipster({theme: 'tooltipster-shadow'});
         wdc_affiche_calques("#"+elemSelected,true);
          affiche_arbre_dom();




      });


    $j("#bt-save" ).click(function() {
        decalage = 0;
$j(".flx").css("width","0px")
$j("#myIFrame").contents().find(".wdcpaddinghandles").remove();
$j("#myIFrame").contents().find(".wdcmarginhandles").remove();
$j("#myIFrame").contents().find('.wdcpadding').remove();
$j("#myIFrame").contents().find('.wdcsel').remove();
$j("#myIFrame").contents().find('.wdc').each(function(){
 $j(this).removeAttr('contenteditable')
});
$j("#myIFrame").contents().find('a').each(function(){
 var href = $j(this).attr("data-href");
 $j(this).attr("href",href);
 $j(this).removeAttr("data-href");
});
$j("#myIFrame").contents().find('.structure').each(function(){

 m=0;
if($j("#bt-viewblocks").attr("data-active")=="true"){
          m = parseInt($j(this).css("margin-top"));
          m = (m-15);
           $j(this).css('margin-top',m+"px");



           m = parseInt($j(this).css("margin-left"));
          m = (m-15);
           $j(this).css('margin-left',m+"px");




         m = parseInt($j(this).css("margin-bottom"));
          m = (m-15);
           $j(this).css('margin-bottom',m+"px");



      m = parseInt($j(this).css("margin-right"));
          m = (m-15);
           $j(this).css('margin-right',m+"px");

          }
 $j(this).removeAttr('data-padding')
$j(this).removeAttr('data-background-color')
$j(this).removeAttr('data-border')
$j(this).removeClass('structure');
$j(this).find('.wdc_label_structure').remove();
$j(this).css("outline","none");

       });


         $j("#bt-viewblocks").attr("data-active","false");
           $j("#bt-vue").attr("data-active","true");



  $j("#myIFrame").contents().find(".infos").remove();
         $j("#myIFrame").contents().find(".jBox-wrapper").remove();
       $j("#myIFrame").contents().find(".ui-selectmenu-menu").remove();
var timeoutID = window.setTimeout(function(){
                 $j("#temp_sav").empty();
     $j("#myIFrame").contents().find("body").clone().prependTo("#temp_sav");

$j("#temp_sav").contents().find("box").remove();
    $j("#temp_sav").contents().find(".system").remove();
         $j("#temp_sav").contents().find('.wdc_label_structure').remove();
         $j("#temp_sav").contents().find('.custom-menu1').remove();

       $j("#temp_sav").contents().find('.wdc').each(function(){

       // $j(this).css('border',$j(this).attr('data-border'))
//$j(this).removeAttr('data-border')
//$j(this).css('background-color',$j(this).attr('data-background-color'))
//$j(this).removeAttr('data-background-color')


       })

 //editor.setValue($j("#myIFrame").contents().find("html").html());

    //sauvegarde les stylesdialog inline dans une feuille de style.
      var docStyle= [];
   // var parser = docCSS["page_custom"].parser;
  // var parsed = docCSS["page_custom"].parsed;

//loadCSS(page_css,"page_custom");
//$j(document).on("cssLoaded", function (evt) {
var parser;
var parsed;
parser = docCSS["page_custom"].parser;
parsed = docCSS["page_custom"].parsed;


            $j("#temp_sav").contents().find(".wdc").each(function(){




                if($j(this).attr('margin') == "15.1px"){
    $j(this).removeAttr('data-margin');
 }







                if($j(this).attr("id") !="wdc"){
            //  console.log($j(this).attr("style"))
          // var    elemStyle = "#"+$j(this).attr("id")+"{\n"+$j(this).attr("style")+"\n}\n"
                     var styleList = null;
                    if($j(this).attr("style")){

                        var ch =$j(this).attr("style").trim();
                        var pop = false;
                        if(ch.substr(-1)==";"){
                            pop = true;
                        }
                        styleList = $j(this).attr("style").trim().split(';');
                    //    $j(this).removeAttr("style");
                        if(pop){
                            styleList.pop();
                        }
                    }
            }
               docStyle.push({id:$j(this).attr("id"),styleList:styleList})

            })


                for (var i = 0; i < docStyle.length; i++) {

   //  console.log("--->"+docStyle[i].id);
     var elid = "#"+docStyle[i].id;

                    parser.removeStyle(parsed,elid);



                 if(docStyle[i].styleList){
     for (var n = 0; n < docStyle[i].styleList.length; n++) {
         var pair =[]

         pair = docStyle[i].styleList[n].split(":");
         var param="";
         var val = "";
            if(pair[0]){
        param =  pair[0].trim()
            }
         if(pair[1]){
      val =  pair[1].trim()
                    }

         parser.setStyle(parsed,elid,param,val);
    // console.log("style:"+"elid"+elid+":::"+param+"-:-"+val);


     };
                 }
    }



   //saveCSS(page_id,parser.getCSSForEditor(parsed))

  // saveJS(page_id,parser.getCSSForEditor(parsed))

         //console.log(docStyle);

				 pageContent =  $j("#temp_sav").html();
			          pageContent =pageContent.split("&quot;").join("");
								new_confirm.openBox("Confirmation","Enregistrement sous "+$j(".currentPage").attr("data-name")+"["+$j(".currentPage").attr("data-id")+"]","Annuler","Confimer",savePage)


        }, 500);



   //  le fichier php rajoutera l'entete, les références des composants utilisés dans la page et à ajouter'
});


function savePage(){
	var titre = $j(".currentPage").attr("data-name");
	var pn = $j(".currentPage").attr("data-id");
	var ps = $j(".currentSite").text();

	 var scriptPhp = "../php/savePageTemp.php?site="+siteDirectory;
	 $j.ajax(

	            {
	                url: scriptPhp,
	                type: "POST",
	               dataType : 'html',
	                data: {
										name: pn,
										site: ps,
										title:titre,
	                        contenu : pageContent

	                },
	                success: function(rep) {


	                       //$j(".currentPage").text(parent.top.page_name)
	           // $j("#lien").text(link);
	      //    $j("#myIFrame").css("opacity","1");
	                  //   alert("Enregistrement réussi");


	                new_alert.openBox("Confirmation","Enregistrement réussi")
	                    var date = new Date;

	             link = "../sites/"+$j(".currentSite").text()+"/pages/"+$j(".currentPage").attr("data-name")+"."+$j(".currentPage").attr("data-id")+".php?caller=editor&"+ date.getTime();

	           $j("#myIFrame").attr("src",link);

	                }
	            });

}


    $j("#bt-grille" ).click(function() {
    beautify() ;
    })

    $j("#bt-globe" ).click(function() {
      //  alert($j("#myIFrame").attr("src"))
        var url = $j("#myIFrame").attr("src");
       // url= url.replace("?caller=editor","");
          var pos = url.indexOf("?");
        url = url.substr(0,pos);
           var d = randomNumberId(10);
        var date = new Date;
        url = url+"?"+ date.getTime();
           window.open(url,'_blank');
          //window.open(url,'_blank');
    });


     $j(".bt-sites" ).click(function() {

         if($j("#leftzone").css("display")=="none"){

                  $j("#leftzone").css("display","block");

         }else{
              $j("#leftzone").css("display","none");
         }


    });








function btVue() {
           decalage = 0;

                  $j("#bt-viewblocks").attr("data-active","false");

                     $j("#myIFrame").contents().find(".wdcpaddinghandles").remove();
   $j("#myIFrame").contents().find(".wdcmarginhandles").remove();
  $j("#myIFrame").contents().find('.wdcpadding').remove();
          $j("#myIFrame").contents().find('.wdcsel').remove();



               $j(".flx").css("width","0px")
  $j("#myIFrame").contents().find('.structure').each(function(){

     m=0;

          m = parseInt($j(this).css("margin-top"));
          m = (m-15);
           $j(this).css('margin-top',m+"px");



           m = parseInt($j(this).css("margin-left"));
          m = (m-15);
           $j(this).css('margin-left',m+"px");




         m = parseInt($j(this).css("margin-bottom"));
          m = (m-15);
           $j(this).css('margin-bottom',m+"px");



      m = parseInt($j(this).css("margin-right"));
          m = (m-15);
           $j(this).css('margin-right',m+"px");

$j(this).removeAttr('data-background-color')
$j(this).removeAttr('data-border')
$j(this).removeClass('structure');
$j(this).find('.wdc_label_structure').remove();


       });
       }


//////////////////////////////////////
// Montre la structure des blocs
//////////////////////////////////////
         $j("#bt-viewblocks" ).click(function() {

  $j("#myIFrame").contents().find(".wdcpaddinghandles").remove();
   $j("#myIFrame").contents().find(".wdcmarginhandles").remove();
  $j("#myIFrame").contents().find('.wdcpadding').remove();
          $j("#myIFrame").contents().find('.wdcsel').remove();


             if($j(this).attr("data-active") == "true"){
                     $j(this).attr("data-active","false")
             btVue();
              //   return;

             }else{

                 $j(this).attr("data-active","true")
                              decalage=15;
             $j("#myIFrame").contents().find('.wdc').each(function(){
                      $j(this).addClass("structure");

                  var m = 0;
                 m = parseInt($j(this).css("margin-top"));
                 m= m+15;
                 $j(this).css("margin-top",m+"px");
                      m = parseInt($j(this).css("margin-left"));
                 m= m+15;
                  $j(this).css("margin-left",m+"px");
                      m = parseInt($j(this).css("margin-bottom"));
                 m= m+15;
                  $j(this).css("margin-bottom",m+"px");
                      m = parseInt($j(this).css("margin-right"));
                 m= m+15;
                  $j(this).css("margin-right",m+"px");


             })
             }









         });


$j("#bt-padding").on("click",function(){

    if($j(this).attr("data-active") == "true"){
        displayPadding = false;
          $j(this).attr("data-active","false")
      $j("#myIFrame").contents().find(".wdcpaddinghandles").css("display","none");
           $j("#myIFrame").contents().find(".wdcpadding").css("display","none");
}else{
     displayPadding = true;
     $j(this).attr("data-active","true")
      $j("#myIFrame").contents().find(".wdcpaddinghandles").css("display","block");
       $j("#myIFrame").contents().find(".wdcpadding").css("display","block");

}

})




    $j("#bt-margin").on("click",function(){

    if($j(this).attr("data-active") == "true"){
        displayMargin = false;
          $j(this).attr("data-active","false")
  $j("#myIFrame").contents().find(".wdcmarginhandles").css("display","none");

}else{
    displayMargin=true;
     $j(this).attr("data-active","true")
  $j("#myIFrame").contents().find(".wdcmarginhandles").css("display","block");

}

})
showStructure = function() {
            //  $j("#bt-vue").attr("data-active","false");
   //if($j(this).attr("data-active") == "false"){
    //   $j(this).attr("data-active","true")
      $j("#myIFrame").contents().find(".wdcsel").remove();
            $j("#myIFrame").contents().find(".wdcpadding").remove();
  // Ajoute un menu contextuel pour editer un bloc et inserer un nouveau bloc


                           var context = '<ul class="custom-menu1" style="display:none"><li data-action="addRow">Ajouter un bloc horizontal</li><li data-action="addColumn">Ajouter un bloc vertical</li><li data-action="deleteBloc">Supprimer</li></ul>';

    var infos = '<div class="infos" style="display:none">Infos</div>';



    $j("#myIFrame").contents().find("body").append(context)

    $j("#myIFrame").contents().find("body").append(infos)



// If the menu element is clicked
$j("#myIFrame").contents().find(".custom-menu1 li").click(function(event){
    //alert("---")
    // Avoid the real one
    event.preventDefault();
    // This is the triggered action name
    switch($j(this).attr("data-action")) {

        // A case for each action. Your actions here
      /*  case "edit":
            //alert(elemSelected)
              parent.top.wdc_selectedContaineur = elemSelected;
            console.log("elemeselected->"+elemSelected);
            wdc_affiche_calques("#"+elemSelected);
            //  document.getElementById('myIFrame').contentWindow.ajusteIsolation("#"+elemSelected);
               // parent.top.diffuseEvent("panel_edit",elemSelected);

            ;

            break;*/
        case "addRow" :
             parent.top.wdc_selectedContaineur = elemSelected;
            console.log(elemSelected);
            wdc_affiche_calques("#"+elemSelected);
           //   document.getElementById('myIFrame').contentWindow.ajusteIsolation("#"+elemSelected);
            var uid = wdc_getUniqueId();
                  var newElement = '<div id="flex_row'+uid+'" class="wdc flex-container-row flex-justify-content-start flex-align-items-start" data-wdctype="flex_row" data-wdcname = "test" data-locked="false" style="position: relative; height: 100px;min-width:100px; background-color:yellow; "></div>';

         var elem2 = "#flex_row"+uid;

       $j("#myIFrame").contents().find("#"+wdc_selectedContaineur).append(newElement);
         var elem3 = $j("#myIFrame").contents().find(elem2);
         init_elem(elem3);
       // document.getElementById('myIFrame').contentWindow.ajusteBox(elem2);

           $j('.tooltip1').tooltipster({theme: 'tooltipster-shadow'});
         wdc_affiche_calques("#"+wdc_selectedContaineur,true);
affiche_arbre_dom();

            break;

        case "addColumn":
             parent.top.wdc_selectedContaineur = elemSelected;
            console.log(elemSelected);
            wdc_affiche_calques("#"+elemSelected);
          //    document.getElementById('myIFrame').contentWindow.ajusteIsolation("#"+elemSelected);
             var uid = wdc_getUniqueId();
                  var newElement = '<div id="flex_column'+uid+'" class="wdc flex-container-column flex-justify-content-start flex-align-items-start" data-wdctype="flex_column" data-locked="false" style="position: relative; min-height: 100px; min-width:100px; background-color:pink; "></div>';

         var elem2 = "#flex_column"+uid;

       $j("#myIFrame").contents().find("#"+wdc_selectedContaineur).append(newElement);
         var elem3 = $j("#myIFrame").contents().find(elem2);
         init_elem(elem3);
      //  document.getElementById('myIFrame').contentWindow.ajusteBox(elem2);

           $j('.tooltip1').tooltipster({theme: 'tooltipster-shadow'});
         wdc_affiche_calques("#"+wdc_selectedContaineur,true);
affiche_arbre_dom();




            break;
            case "deleteBloc":

            $j("#myIFrame").contents().find("#"+elemSelected).remove();
              wdc_affiche_calques("#"+wdc_selectedContaineur,true);
affiche_arbre_dom();

            break;
    }

    // Hide it AFTER the action was triggered
       $j("#myIFrame").contents().find(".custom-menu1").css("display","none");
  });



       $j("#myIFrame").contents().find('.wdc').each(function(){

if($j(this).attr("id")!= "wdc"){

    init_elem(this)

}



       });




}



  //  });

        $j("#bt-structure2" ).click(function() {

    });

//------------------fin boutons haut




   // }); // fin fonction on load document


   }//fin initialize




function getStyleColor(classN,directive){
    //ne pas oublier le point dans le nom de classe
   var parser;
    var parsed;

     parser = docCSS["form_custom"].parser;
     parsed = docCSS["form_custom"].parsed;

return parser.getStyle(parsed,classN,directive);


}



function  setColorValueToClass(classN,directive,value){

    //ne pas oublier le point dans le nom de classe
   var parser;
    var parsed;

     parser = docCSS["form_custom"].parser;
     parsed = docCSS["form_custom"].parsed;

parser.setStyle(parsed,classN,directive,value);
saveGlobalCSS("form_custom",parser.getCSSForEditor(parsed));

}






function getAttrOfSelected(attr,findelem){
//console.log("attr------------>"+elemSelected+"-->"+attr+"-->"+findelem);

if(attr != undefined){

    if(findelem != undefined){

if(attr == "checked"){
  val1 = $j("#myIFrame").contents().find("#"+elemSelected).find(findelem).prop("checked")

  if(val1==true){

    val1="true";
  }else{
    val1 = "false";
  }
return val1;
}else{
if(findelem == "self"){
    val1 = $j("#myIFrame").contents().find("#"+elemSelected).attr(attr)
}
else{
    val1 = $j("#myIFrame").contents().find("#"+elemSelected).find(findelem).attr(attr)
}

return val1;
}




    }else{
         val1 = $j("#myIFrame").contents().find("#"+elemSelected).attr(attr)

     return val1;
    }

}
};



function getValueOfSelected(obj){


 var t =obj.attr("target");
     var val1 = "";
 //console.log("targettttttt"+t)
if(t != undefined){
    if (typeof(elemSelected) !== 'undefined' && elemSelected !="") {


    var prop1 =obj.attr("css");





    if(t == "self"){

if(prop1 == undefined){
val1 = $j("#myIFrame").contents().find("#"+elemSelected).attr(obj.attr("attr"));

//console.log("val---"+obj.attr("attr")+"-------->"+val1)
}else{
val1 = $j("#myIFrame").contents().find("#"+elemSelected).css(obj.attr("css"));
}

}else{


    if(t=="label"){
        //alert(t)


     var id = $j("#myIFrame").contents().find("#"+elemSelected).attr("data-wdcuid")
 val1 =   $j("#myIFrame").contents().find("[for='input"+id+"']").text();

   //  val1 = $j("#myIFrame").contents().find("#"+t).prev().text();

    }else{

//no label, no self

if(prop1 == undefined){


val1 = $j("#myIFrame").contents().find("#"+elemSelected).find(t).attr(obj.attr("attr"));
  console.log("-get value off-++>"+elemSelected+"-"+t+"xxxx"+prop1)
}else{

val1 = $j("#myIFrame").contents().find("#"+t).css(obj.attr("css"));

}

    }//fin if label

}
    }

    if(val1==undefined){
        val1="";
    }
    oldGetVal = elemSelected;
    oldVal = val1;
    return val1;
/*  }else{
    return oldVal;*/
  }else{
    return val1
  }
}

function deletePropSelected(obj){
    var cible =obj.attr("data-target");
        if(cible != "BODY" && cible != "HTML"){
        cible = "#"+cible;
      }
      if(cible =="#self"){
          cible  = "#"+elemSelected;
      }
    var prop =obj.attr("data-css");
    if(prop == 'undefined'){
    prop =obj.attr("data-attr");

     $j("#myIFrame").contents().find(cible).removeAttr();

      }else{

     $j("#myIFrame").contents().find(cible).css(prop,"");

      }
}

function setAttrToSelected(attr,findelem,val){
console.log("--"+attr+"--"+findelem+"--"+val);



          cible  = "#"+elemSelected;




    if(attr != undefined){

    if(findelem != "self"){
        $j("#myIFrame").contents().find("#"+elemSelected).find(findelem).attr(attr,val);


    }else{
         $j("#myIFrame").contents().find("#"+elemSelected).attr(attr,val);

    }

}
}

function setValueToSelected(obj,val){
 // alert(val);

    var cible =obj.attr("data-target");
   // console.log("-"+elemSelected+"atrrrrr"+obj.attr("data-attr")+"c"+cible)
     if(cible == 'undefined'){
          cible  = "#"+elemSelected;
      }else if(cible =="self"){
          cible  = "#"+elemSelected;
      }else{

          if(cible != "BODY" && cible != "HTML"){
        cible = "#"+cible;
      }

      }

    var prop =obj.attr("data-css");
    if(prop == 'undefined'){
          prop =obj.attr("data-attr");

         //   console.log("atrrrrr"+obj.attr("data-attr")+"cible"+cible)

     $j("#myIFrame").contents().find(cible).attr(prop,val);

      }else{
          if(prop == "background-image"){
              $j("#myIFrame").contents().find(cible).css(prop,'url(' + val + ')');
          }else{



     $j("#myIFrame").contents().find(cible).css(prop,val);
      }
      }
}

function setClassToSelected(obj,val,noclass){
  //alert(val);
    var cible =obj.attr("data-target");
        if(cible != "BODY" && cible != "HTML"){
        cible = "#"+cible;
      }
      if(cible =="#self"){
          cible  = "#"+elemSelected;
      }

     $j("#myIFrame").contents().find(cible).removeClass(noclass);
     $j("#myIFrame").contents().find(cible).addClass(val);

  /*  var prop =obj.attr("data-css");
    if(prop == 'undefined'){
          prop =obj.attr("data-attr");
     $j("#myIFrame").contents().find(cible).attr(prop,val);

      }else{
          if(prop == "background-image"){
              $j("#myIFrame").contents().find(cible).css(prop,'url(' + val + ')');
          }else{
     $j("#myIFrame").contents().find(cible).css(prop,val);
      }
      }*/
}
function wdc_getUniqueId(){

compteur2++;
   // $j("#wdc-content").attr("data-cpt",compteur2);


   localStorage.setItem("compteur2",compteur2);




        var str = compteur2.toString();

    var L = str.length;
    if(L==1){
    str = "00"+str;
}else if(L==2){
    str = "0"+str;
};
            var id = '';
    var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    charSet = charSet.split("");
            for (var i = 1; i <= 3; i++) {
                var randPos = Math.floor(Math.random() * 26);
                id += charSet[randPos];
            }
    return  "_"+str+"_"+id;
};

function getUniqueId(){

   /* $j.ajax({
     type: "GET",
     url: "../php/uniqueId.php",
     success: function(data) {
   return data;
        // alert(window.uid);
     }
  }); */
   // console.log(localStorage.getItem("compteur"));
 /*


if(localStorage.getItem("compteur1") === null){
    localStorage.setItem("compteur1",0);
    compteur=0;
}else if(parseInt(localStorage.getItem("compteur1")) > 999){
      localStorage.setItem("compteur1",0);
} else {
  compteur =   parseInt(localStorage.getItem("compteur1"));


}*/
 compteur++;


   localStorage.setItem("compteur",compteur);
compteur =  parseInt(localStorage.getItem("compteur"));

     compteur++;
    var str = compteur.toString();
    var L = str.length;
    if(L==1){
    str = "00"+str;
}else if(L==2){
    str = "0"+str;
};
            var id = '';
    var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    charSet = charSet.split("");
            for (var i = 1; i <= 3; i++) {
                var randPos = Math.floor(Math.random() * 26);
                id += charSet[randPos];
            }
            return "_"+str+"_"+id;


};

/////////////////////////////////////////////////////////////////////////////////////////
//
//
//   Charge les propriétés dans le panneau "propriétés" à partir du descriptif .XML
//
// propriété loadproperty property
/////////////////////////////////////////////////////////////////////////////////////////

/*function loadXmlProp2(url,elem,fileType,loading){
 $j.ajax({
     type: "GET",
     url: url,
     // async:false,
      error: function(){
            console.log("-------error"+url+"--"+elem+"--");
           $j(elem).empty();
                   },
     success: function(data) {
                  console.log("-------zzzzzz"+url+"--"+elem+"--");
         displayProps(data,url,elem,fileType,loading)
     }
 })
};*/


function loadXmlProp(url,elem,fileType,loading){

 $j.ajax({
     type: "POST",
     url: url,

      error: function(){

           $j(elem).empty();
                   },
     success: function(data) {

         displayProps(data,url,elem,fileType,loading)
     }
 })
};




function displayProps(data,url,elem,fileType,loading){
  groups_to_display = new Array();
console.log("displayprops"+url)
         $j(elem).empty();

    if(loading == "test"){


    }


         //pour chaque élément du fichier .xml
               $j(data).find('item').each(




                         function()
                         {

                 var xml_item =  $j(this) ;
               //ajoute code en fonction du type d'élément
                             //color:#00b9d3; bleu turquoise
                            switch ($j(this).attr("type")) {

case "clear" :

         $j("#prop_context2").empty();
      break;

case "combo_image" :

var newElem = new ComboImage($j(this),_wdcActiveGroupId);
break;

case "title":

var newElem = new Title($j(this),elem);
break;

case "sub-title":


        if(wdcActiveGroupId !="")  {
                         var newElem = new SubTitle($j(this),wdcActiveGroupId);
                  }else{
                         var newElem = new SubTitle($j(this),elem);
        }

        break;

case "group":

                                  var ide = 'contextual_group'+getUniqueId();
                                    lastCreatedGroup = ide;
                   if($j(this).attr("target") == "contextual_ribbon") {

                       $j("#prop_context2").append(' <div id= "'+ide+'" class="tooltip2 tooltipstered contextual_ribbon flx flex-container-row flex-wrap-wrap flex-align-items-center '+$j(this).attr("name")+'" title="'+$j(this).attr("title")+'" style="position:relative;margin-top:4px;margin-left:10px;cursor:pointer" data-listener="false"  ><img class=" barre_outils" src="./assets/icones/flexbox/bande15.png" data-listener="false"> <div style="border-left:solid 1px lightgrey;height:38px;min-width:1px;margin-left:10px;margin-right:5px" ><div class="ribbon_content flx flex-container-row flex-align-items-center" style="background-color: rgba(108, 223, 234, 0.2);width:0px;overflow:hidden"></div></div>');

                        wdcActiveGroupId = "#"+ide;
                   } else{


              var currentId= getUniqueId();
                            var newElem =   $j(elem).append('<div id="'+$j(this).attr("name")+currentId+'" data-group_name="'+$j(this).attr("name")+'" data-connectedTo = "'+$j(this).attr("connectedTo")+'" data-selborder="'+$j(this).attr("selborder")+'"  style="position:relative;display:block;color:#555555;padding:0px;background-color:white"></div>');

                    wdcActiveGroupId = "#"+$j(this).attr("name")+currentId;
                   }

                    break;

case "closegroup":


                    wdcActiveGroupId = "";

                    break;

                      case "js":
        var adrs = url.replace(".xml","_xml.js")
                    $j.getScript(adrs,function() { });

                    break;

case "endRadioGroups":

//alert("okkk")

         var me = $j(this);
var rqt1  ="[data-connectedTo='"+$j(this).attr("name")+"']";
$j(rqt1).css("display","none");

  $j(":radio").each(function(){
      //  console.log($j(this).attr("name")+":radiogroup----");
      if($j(this).attr("name") == $j(me).attr("name") ){


          if($j(this).prop("checked")){
              var rqt = "[data-group_name='"+ $j(this).val()+"']"
               $j(rqt).css("display","block")
                 console.log(rqt+":radiogroup:"+$j(this).prop("checked"))
          }


      }
  })




break;


case "buttoncss":


                                    // sera ajouté au group déclaré avant
              var currentId= getUniqueId();
                                    var obj =$j(this);
                  if(wdcActiveGroupId !="")  {


                        //  console.log("----++--->group:::"+wdcActiveGroupId)

                       var newElem =   $j(wdcActiveGroupId).append('<div id="buttoncss'+currentId+'" class="'+$j(this).attr("class")+'" style="position:relative;display:inline-block;margin-top:10px;margin-right:5px;cursor:pointer;opacity:0.5"  data-js="'+$j(this).attr("js")+'" data-target="'+$j(this).attr("target")+'" data-value="'+$j(this).attr("value_on_press")+'" title="'+$j(this).attr("help")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'"><img id="img'+currentId+'" src="'+$j(this).attr("ico")+'" /></div>');
                  }
                                    $j("#buttoncss"+currentId).mouseenter(function(e) {
                                        $j(this).css("opacity","1");
                                                });
                                    $j("#buttoncss"+currentId).mouseleave(function(e) {
                                    $j(this).css("opacity","0.5");
                                                 });
                                    //si pas de js externe, applique juste la value on press
                                     if  ($j(this).attr("js")=="false"){

                                    $j("#buttoncss"+currentId).click(function(e) {
                                       /*   var val ="";
                                     if(parseInt(getValueOfSelected(obj))){
                                    val =parseInt(getValueOfSelected(obj));

                                      }else{
                                    val =getValueOfSelected(obj);
                                      };*/

                                    setValueToSelected($j('#buttoncss'+currentId),$j(this).attr("data-value"));
                                    loadXmlProp(url,elem,fileType,loading);
                                                 });
                                     };
                          //infobulle
                       $j('#buttoncss'+currentId ).tooltipster({theme: 'tooltipster-shadow',maxWidth:'400',contentAsHTML:'true'});
                    break;



case "buttonSetClass":
                                    // sera ajouté au group déclaré avant
              var currentId= getUniqueId();
                                    var obj =$j(this);
                  if(wdcActiveGroupId !="")  {

                  if (typeof(elemSelected) !== 'undefined' && elemSelected !="") {
                      var val1 = $j("#myIFrame").contents().find("#"+elemSelected).hasClass($j(this).attr("class"));
                    var   color;
                      if(val1){
                      //  alert($j(this).attr("class"))
                        color = 1;
                      }else{
                          color=0.3;
                      }

                       var newElem =   $j(wdcActiveGroupId).append('<div id="buttonSetClass'+currentId+'"   style="position:relative;display:inline-block;margin-top:10px;margin-right:5px;cursor:pointer;opacity:'+color+'"   data-target="'+$j(this).attr("target")+'" data-class="'+$j(this).attr("class")+'" data-removeclass="'+$j(this).attr("removeClass")+'" title="'+$j(this).attr("help")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'"><img id="img'+currentId+'" src="'+$j(this).attr("ico")+'" /></div>');          }
                  }
                                    /*
$j("#buttonSetClass"+currentId).mouseenter(function(e) {
$j(this).css("opacity","1");
             });
$j("#buttonSetClass"+currentId).mouseleave(function(e) {
$j(this).css("opacity","0.5");
             });*/
//si pas de js externe, applique juste la value on press


                        $j("#buttonSetClass"+currentId).click(function(e) {

                        setClassToSelected($j('#buttonSetClass'+currentId),$j(this).attr("data-class"),$j(this).attr("data-removeclass"));
                        loadXmlProp(url,elem,fileType,loading);
                                     });


                                               $j('#buttonSetClass'+currentId ).tooltipster({theme: 'tooltipster-shadow',maxWidth:'400',contentAsHTML:'true'});
                    break;


case "spinner":
                                      var currentId= getUniqueId();
                      var newElem =   $j(elem).append('<div id="spinner'+currentId+'"  style="position:relative;margin-left:10px;cursor:pointer;height:20px"  data-target="'+$j(this).attr("target")+'" data-value="'+$j(this).attr("value_on_press")+'" title="'+$j(this).attr("help")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'"><input id="spin'+currentId+'" data-name="'+$j(this).attr("name")+'" style="position:relative;width:60px;"></div>');



                                               var spinner = $j("#spin"+currentId ).spinner();
                       spinner.spinner({

                             max: 3000,
                           min:0,
                            step: 1,
                          numberFormat: "n",
                      spin: function( event, ui ) {

                          setValueToSelected($j("#spinner"+currentId),ui.value+"px");

                      },


                    });

                    $j("#spin"+currentId ).on("keyup",function(){

                        setValueToSelected($j("#spinner"+currentId),  $j("#spin"+currentId ).spinner("value")+"px");

                    })
                                    var n = getValueOfSelected($j(this)).length;
                                  //  console.log($j(this))
                        if(n > 0){
                          $j("#spin"+currentId ).spinner( "value", parseInt(getValueOfSelected($j(this))));
                          //  alert(bgimage);
                       };







                                        break;

case "button":

                  var currentId= getUniqueId();

                               var cible
                 if(wdcActiveGroupId !="")  {
                            cible = $j(wdcActiveGroupId);
                 }  else{

                      cible = $j(elem);

                 }
           cible.append('<div id="wdcbutton'+currentId+'" data-targetType ="'+$j(this).attr("targetType")+'"   data-target="'+$j(this).attr("target")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'" data-help="'+$j(this).attr("help")+'" data-marge="10"   style="position:relative;font-size:12px;margin-bottom:5px;padding-left:6px;padding-right:15px;padding-bottom:0px;min-height:20px"><span id="button'+currentId+'" data-targetType ="'+$j(this).attr("targetType")+'"   data-target="'+$j(this).attr("target")+'" data-action= "'+$j(this).attr("action")+'" style="float:right;-webkit-user-select:none;user-select:none;padding:5px;width:auto;border:solid;border-width:1px;border-color:1px;border-radius:5px; cursor:pointer">'+$j(this).text()+'</span></div> ');


                            $j("#button"+currentId).mouseenter(function(e) {
                $j(this).css("background-color","#80e5ed");
                             });
                                                                $j("#button"+currentId).mouseleave(function(e) {
                $j(this).css("background-color","white");
                             });
                                   $j("#button"+currentId).click(function(e) {
                //deletePropSelected($j("#wdcbutton"+currentId));
              //  alert($j(this).attr("data-action"))
                if($j(this).attr("data-targettype")=="class"){
                //var n =   $j("."+$j(this).attr("data-target")).val()
                    var n =   $j(this).parent().prev().find("."+$j(this).attr("data-target")).val();
            //    alert(n);
                }
                window[$j(this).attr("data-action")](n);
                              //   loadXmlProp(url,elem,fileType,loading);
                             });

                                        break;
case "VSpace":

           var currentId='';
                var curobj = $j(this);

               var txt="";
                                    currentId='space'+getUniqueId();

                                          var el = elem;
               if(wdcActiveGroupId !="") {
                el = wdcActiveGroupId;
               }

                      var newElem =   $j(el).append('<div id="'+currentId+'"  data-name="'+$j(this).attr("name")+'"  data-group_name="'+wdcActiveGroupId+'" style="position:relative;padding-left:10px;padding-top:5px;min-height:20px"></div>');
       //    $j(newElem).uniqueId();

                    break;
case "label":
                                   // alert("--");
                var el = elem;
               if(wdcActiveGroupId !="") {
                el = wdcActiveGroupId;
               }


              $j(el).append('<div id="label'+getUniqueId()+'" data-group_name="'+wdcActiveGroupId+'"  data-name="'+$j(this).attr("name")+'"  style="position:relative;min-height:20px;font-size:12px;margin-top:2px;padding-left:10px;margin-top:5px;">'+$j(this).text()+' :</div>');

                    break;




case "combo":


             var newElem = new combo($j(this),elem,wdcActiveGroupId);



                                            break;
case "checkbox":

           var currentId= getUniqueId();
           var selected ="";
           var dt =   getAttrOfSelected($j(this).attr("attr"),$j(this).attr("target")) ;


                                    if(dt == "true"){

                    selected = "checked";   ;
                                    }

                  $j(elem).append('<div  style="padding-left:5px" id="wdc_checkbox'+currentId+'"  data-wdctype="checkbox" data-target="'+$j(this).attr("target")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'" data-help="'+$j(this).attr("help")+'" > <input  data-target="'+$j(this).attr("target")+'"  id="checkbox-'+currentId+'" name="'+$j(this).attr("name")+'"  '+selected+' type="checkbox"><label for="checkbox-'+currentId+'" style="cursor: pointer;">'+$j(this).text()+'</label></div>')

            $j("#checkbox-"+currentId).click(function(e) {
              var target = $j(this).attr("data-target");
              var t="";
              if(target.length > 0){
                t=target;


              }

                var state ="";
                if($j(this)[0].hasAttribute("checked")){
                    $j(this).removeAttr("checked");
                    state = "false";

                }else{
                         $j(this).attr("checked","checked");
                    state="true";
                }
if($j(this).parent().attr("data-attr") == "checked"){
  if(state == "true"){
    state = "checked";
    var rqt = "[name ='"+$j("#myIFrame").contents().find("#"+elemSelected).find(t).attr("name")+"']";

        $j("#myIFrame").contents().find(rqt).each(function(){
//console.log("ppp§§§§§§§§§§")

          $j(this).removeAttr("checked");
        })
      $j("#myIFrame").contents().find("#"+elemSelected).find(t).prop("checked",true)
              $j("#myIFrame").contents().find("#"+elemSelected).find(t).attr("checked","checked")
  //  setAttrToSelected($j(this).parent().attr("data-attr"),t,state);

  }else{

      $j("#myIFrame").contents().find("#"+elemSelected).find(t).removeAttr("checked")
  }


}else{
setAttrToSelected($j(this).parent().attr("data-attr"),t,state);

}


             });






                    break;


 case "radio":

                var currentId= getUniqueId();

         //if($j(this).attr("grpName") != radioGrp){
             //  radioGrp = $j(this).attr("grpName")
                          var selected ="";

                                     var dt =   getAttrOfSelected($j(this).attr("attr"),$j(this).attr("target")) ;



                                     $j(elem).append('<div style="padding-left:5px" id="wdc_radio'+currentId+'"  data-wdctype="radio" data-target="'+$j(this).attr("target")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'" data-help="'+$j(this).attr("help")+'" > <input data-target="'+$j(this).attr("target")+'" id="radio-'+currentId+'" name="'+$j(this).attr("name")+'" '+selected+' data-showgroup="'+$j(this).attr("connectedToGroup")+'" value="'+$j(this).attr("param")+'" type="radio"><label for="radio-'+currentId+'" style="cursor: pointer;">'+$j(this).text()+'</label></div>')


                                    if(dt == $j(this).attr("param")){
  // console.log("radio::::::aaa::::::::attr:>"+$j(this).attr("attr")+"::target::>"+$j(this).attr("target")+":param:>"+$j(this).attr("param")+"::val cible:>"+dt);
                 $j("#radio-"+currentId).prop("checked", true)
                                    }  else{

                                     if($j(this).attr("selected")=="true"){
                                        $j("#radio-"+currentId).prop("checked", true)
                                    }
                                       }







             $j("#radio-"+currentId).click(function(e) {

               var target = $j(this).attr("data-target");
               var t="";
               if(target.length > 0){
                 t=target;


               }

                setAttrToSelected($j(this).parent().attr("data-attr"),t,$j(this).val());



                      if($j(this).attr("data-showgroup") == "true") {

                                  var rqt1  ="[data-connectedTo='"+$j(this).attr("name")+"']";
                               $j(rqt1).css("display","none");
                          //alert($j(this).val())
                                   // console.log(rqt1);
                                      var rqt = "[data-group_name='"+ $j(this).val()+"']"
                                            $j(rqt).css("display","block")
                                //  $j("#"+$j(this).val()).css("display","none")

                                       }









             });

      /*   }else{
             $j("#"+radioGrp).append('<input id="radio-'+currentId+'" name="'+$j(this).attr("name")+'" value="" class="ui-radio" type="radio"><label for="radio-'+currentId+'" style="cursor: pointer;">'+$j(this).text()+'</label>')

         }*/

 //radiobutton





                    break;







case "imagefile":


            var currentId= getUniqueId();

                  var bgimage =  "../system/assets/icones/image.png" ;


                 var n = getValueOfSelected($j(this)).length;
                if(n > 0){
               bgimage = getValueOfSelected($j(this));

                     if(bgimage){
                          bgimage= bgimage.replace("url(","");
                     bgimage= bgimage.replace(")","");
                     bgimage=bgimage.replace("\"","");
                    bgimage= bgimage.replace("\"","");

                     };

                 var   p1 = bgimage.lastIndexOf("/");
                 var filename =    bgimage.substr(p1+1);

               };


                                    if(bgimage=="none"){
                                        bgimage =  "../system/assets/icones/image.png" ;
                                        filename =""
                                    }
                                   // alert("../sites/"+$j(".currentSite").text()+"/images/")
                                     bgimage = bgimage.replace("../images","../sites/"+$j(".currentSite").text()+"/images/")
                                   //alert(bgimage);

            $j(elem).append('<div id="imagefile'+currentId+'"  data-wdctype="wdc_dbimage" data-target="'+$j(this).attr("target")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'" data-help="'+$j(this).attr("help")+'" data-marge="10"  style="position: relative; width:auto;height:130px; min-height: 130px;  margin-left:10px;margin-right:15px;padding-top:10px;padding-bottom:20px; border: 1px solid; cursor: default; overflow:hidden;visibility: visible;"><div id="c1" style="display:table;width:100%;height:100%"><div id="c2" style="display:table-row;height:100%;width:100%;text-align:center;" ><div style="display:table-cell;vertical-align:middle;width:100%;height:100%"><img id="img'+currentId+'" class="dbimage" data-marge="15" src="'+bgimage+'" data-dbimagetype="url" data-make_ico="true" data-make_zoom="false" data-make_hd="false" data-ico="100" data-zoom="700" data-hd="3000" data-original="true" style="height:100%;width:auto;"></div></div></div><input type="file" class="selectFile" id="inputfile'+currentId+'" style="visibility:hidden;position:absolute;left: 0px; " accept=".jpg,.png,.svg"><div id="adrs'+currentId+'" class="adrsImage" style="position: absolute; left: 0px; bottom: 5px; font-size: 10px; font-weight: normal; width: 100%; text-align: left; visibility: visible; padding-left: 3px;">Filename:</br>'+filename+'</div><div id="overlay'+currentId+'" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:black;opacity:0.5;visibility:hidden;"></div><img id="progress'+currentId+'" src="../system/assets/loaders/bar90.gif" style="position:absolute;left:0px; visibility:hidden"><div id="msg'+currentId+'" style="position:absolute;left:0px;bottom:0px; font-size:12px;color:white;width:100%;text-align:center;visibility:hidden;">Téléchargement.…</div></div>');

            if($j(this).attr("target") != "self"){
            $j(document).on("pageLoaded",{curId:currentId,target: $j(this).attr("target"),css:$j(this).attr("css"),attr:$j(this).attr("attr")}, function (evt) {

             switch (evt.data.css) {

              case "background-image":
                     var bkimg = $j("#myIFrame").contents().find("#"+evt.data.target).get(0).style["backgroundImage"];

                     if(bkimg != undefined){
                          bkimg= bkimg.replace("url(","");
                     bkimg= bkimg.replace(")","");
                     bkimg= bkimg.replace("\"","");
                     bkimg= bkimg.replace("\"","");
                                bkimg = bkimg.replace("../images","../sites/"+$j(".currentSite").text()+"/images/")
                                $j("#imagefile"+currentId).find(".dbimage").attr("src",bkimg);
                          $j("#imagefile"+currentId).find(".adrsImage").text(bkimg)
                     };
                       if(bkimg == ""){
                                    bkimg = "../system/assets/icones/image.png";
                           $j("#imagefile"+currentId).find(".adrsImage").text("")
                       };
 if(bkimg == "none"){
                                    bkimg = "../system/assets/icones/image.png";
     $j("#imagefile"+currentId).find(".adrsImage").text("")
                       };

                     $j("#imagefile"+currentId).find(".dbimage").attr("src",bkimg);


               break;


              default:


             break;

             };

            });
            }

//-----fin si page wdc

                $j('#imagefile'+currentId).find(".dbimage").click(function() {
                var obj = '#inputfile'+currentId;
                $j(obj).click();
                });





                $j('#imagefile'+currentId).find('.selectFile').change(function(event){

                var pos = this.id.lastIndexOf("-");
                var uid= this.id.substring(pos);
                var obj = '#inputfile'+currentId;
                var val =$j(obj).val();
                var pos= val.lastIndexOf("\\");

                var adrs =   $j('#imagefile'+currentId).find("#adrs"+currentId) ;
                var overlay =   $j('#imagefile'+currentId).find("#overlay"+currentId) ;
                var progress =   $j('#imagefile'+currentId).find("#progress"+currentId) ;
                var msg =   $j('#imagefile'+currentId).find("#msg"+currentId) ;




                adrs.text(val.substring(pos+1));
                overlay.css("visibility","visible");
                progress.css("visibility","visible");
                msg.css("visibility","visible");
                var H = (parseInt($j(this).parent().css("height"))/2)-5;
                progress.css("top",H+"px");
                msg.css("top",(H+15)+"px");
                var W = ( parseInt($j(this).parent().css("width"))/2 -45);
                progress.css("left",W+"px");

                  var selectedImg = $j(obj)[0].files[0];


                        if (selectedImg==undefined )
                        {

                                      overlay.css("visibility","hidden");
                progress.css("visibility","hidden");
                msg.css("visibility","hidden");
                        } else if (selectedImg.name.match(".*\.jpg")|| selectedImg.name.match(".*\.png"))
                               {

                               }


             var f = new Object();
              var reader = new FileReader();
                reader.onload = function(e) {

                    currentImage = e.target.result;
                    var im =  $j('#imagefile'+currentId).find("#img"+currentId) ;
                   im.attr('src',currentImage);

                    formdata = new FormData()
                    formdata.append("file", selectedImg);
                    formdata.append("ico", $j(im).attr("data-ico"));
                    formdata.append("zoom", $j(im).attr("data-zoom"));
                    formdata.append("hd", $j(im).attr("data-hd"));
                    formdata.append("make_ico", $j(im).attr("data-make_ico"));
                    formdata.append("make_zoom", $j(im).attr("data-make_zoom"));
                    formdata.append("make_hd", $j(im).attr("data-make_hd"));
                    formdata.append("original", $j(im).attr("data-original"));
                    formdata.append("test", "success");

                    var xhr = new XMLHttpRequest();

                        // XHR2 has an upload property with a 'progress' event
                    xhr.upload.addEventListener(
                            "progress",
                            function (e) {
                                if (e.lengthComputable) {
                                    var percentage = Math.round((e.loaded * 100) / e.total);
                                msg.text("Pourcentage chargé : "+percentage+" %");
                                }
                            },
                            false
                        );




                        xhr.upload.addEventListener("load", function (e) {
                       msg.text("Traitement de l'image");
                        }, false
                    );
                        xhr.open("POST", "../php/saveImage.php");

                        xhr.onreadystatechange = function(){
                            if (this.readyState == 4) {
                                if ((this.status >= 200 && this.status < 300) || this.status == 304) {
                                   if (this.responseText != "") {
                         var rep = xhr.responseText;
                                     rep =  rep.trim();
                                    rep = rep.replace("_i","");

                                 //console.log(rep);
                                    var   visu = rep.replace("../images","../sites/"+siteDirectory+"/images/")
                                           // alert(rep);
                                    im.attr('src',visu);
                                    im.next().next().text(visu);
                                    im.attr("data-value",visu);
                                     overlay.css("visibility","hidden");
                        progress.css("visibility","hidden");
                        msg.css("visibility","hidden");
                                 setValueToSelected($j("#imagefile"+currentId),rep);
                                       //redirection vers une autre page
                                    //alert(xhr.responseText);
                                    }
                               //     $j("#clear-files").show();
                                }
                            }
                        };

                        xhr.send(formdata);

        };
          reader.readAsDataURL(selectedImg);

    });


                $j('#imagefile'+currentId).find(".dbimage").load(function(){
                 $j(this).removeAttr( 'style' );
                    imW = $j(this).prop('naturalWidth');
                    imH = $j(this).prop('naturalHeight');
                    if(imH < 130 && imW < 300){
                   $j(this).css("width",imW);
                     $j(this).css("height",imH);
                    }else if(imW > 300 && imH < 130){
                         $j(this).css("width","100%");
                        $j(this).css("height","auto");
                    }else{
                           $j(this).css("height","130px");
                        $j(this).css("width","auto");



                                                                 }




                });

//-----fin file image
                    break;
//-->composant text
case "text":
case "textarea":

                           var currentId= getUniqueId();       //  alert("--");
              var el = elem;
               if(wdcActiveGroupId !="") {
                el = wdcActiveGroupId;
               }



                    var myVal = getValueOfSelected($j(this));
                    if(myVal == "") {
                      //  myVal="id" ;
                    }
                    var cls = "";
                //    if($j(this).attr("class") != undefined){
                      cls = 'class = "'+$j(this).attr("class")+'"';
                  //  }




                if($j(this).attr("type") == "text"){
            $j(el).append('<div id="text'+currentId+'" style="position:relative;min-height:20px;font-size:12px;padding-left:10px;padding-right:15px;padding-bottom:0px;"><input id="input'+currentId+'"  value="'+myVal+'" style="position:relative;display:block;width:100%;box-sizing:border-box;border:solid;height:22px;border-color:grey;border-width:1px;padding-left:2px;margin-right:5px; " data-target="'+$j(this).attr("target")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'"  '+cls+' data-help="'+$j(this).attr("help")+'"></div>');
}else if($j(this).attr("type") == "textarea"){

  $j(el).append('<div id="text'+currentId+'" style="position:relative;min-height:20px;font-size:12px;padding-left:10px;padding-right:15px;padding-bottom:0px;"><textarea id="input'+currentId+'"  value="'+myVal+'" style="position:relative;display:block;max-width:100%;min-width:100%;box-sizing:border-box;border:solid;height:60px;min-height:22px;border-color:grey;border-width:1px;padding-left:2px;margin-right:5px; " data-target="'+$j(this).attr("target")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'" '+cls+' data-help="'+$j(this).attr("help")+'">');

}


                                                $j( "#input"+currentId ).focusin(function() {
                  $j(this).css("background-color","#80e5ed");
            });


  $j( "#input"+currentId ).on('input', function() {
   if($j(this).attr("data-target")=="label")  {

 //récupère l'idunique du composant
      var wdcuid =  $j("#myIFrame").contents().find("#"+elemSelected).attr("data-wdcuid")
      //met à jour l'éiquette
           $j("#myIFrame").contents().find("[for='input"+wdcuid+"']").text($j(this).val());

             }else{

               var target = $j(this).attr("data-target");
               var t="";
               if(target.length > 0){
                 t=target;
                    setAttrToSelected($j(this).attr("data-attr"),t,$j(this).val());
               }else{


              setValueToSelected($j(this),$j(this).val());

               }

             }
                // do something
            });
                $j("#input"+currentId ).focusout(function() {
                  $j(this).css("background-color","white");

            });

                    if($j(this).attr("help") != undefined) {
               $j('#input'+currentId).jBox('Mouse',{
    content: $j(this).attr("help")
  });
                        }



                                break;


case "colorpalette":


                         var currentId= getUniqueId();
                                    var currentName = $j(this).attr("name")+currentId;
                                    var curEl = $j(this);
                            var newElem =   $j(elem).append('<div id="'+currentName+'"   style="position:relative;font-size:14px;padding-top:10px;padding-left:3px;padding-bottom:10px;"></div>');
                                    var colorUrl = "../sites/"+$j(".currentSite").text()+"/css/colors.xml";

                           $j.ajax({
                             type: "POST",
                             url: colorUrl,
                             success: function(data) {

                        var ar = $j(data).find("colors").text().split("*");
                                 //console.log(ar.toString());




                                  $j.each( ar, function( key, value ){

                                      $j("#"+currentName).append('<div id="color'+key+currentId+'" data-value="'+curEl.attr("value_on_press")+'"  class="'+curEl.attr("class")+'" style="float:left;margin:3px;border:solid;border-color:grey;cursor:pointer;border-width:1px;width:30px;height:30px;border-radius:4px;background-color:'+value+'"></div>');

                                  })
                                           }

                                   });



                                             break;


case "colorpicker":
                          if($j("#palette").length == 0){
                              $j("body").append('<div id="palette" style="position:absolute;overflow:hidden;width:110px;top:0px; left:0px ; box-sizing:border-box;border:solid;border-radius:5px;border-color:grey;padding:2px;box-shadow: 5px 5px 20px 0px #9b9b9b;border-width:1px;background-color:white;display:none"></div>');
                             }
                                            var currentId= getUniqueId();
                                                //   alert($j(this).attr("name"))   ;
                    $j(elem).append('<div id="'+currentId+'" style="display:flex;flex-direction:row;min-height:22px"><div id="colorpicker'+currentId+'" data-name="'+$j(this).attr("name")+'"  style="position:relative;cursor:pointer;min-height:22px;width:100px;font-size:12px;box-sizing:border-box;border:solid;border-color:grey;border-width:1px;margin-left:10px;margin-right:15px;background-color:'+getValueOfSelected($j(this))+'" data-target="'+$j(this).attr("target")+'"   data-css="'+$j(this).attr("css")+'" data-attr="'+$j(this).attr("attr")+'" data-help="'+$j(this).attr("help")+'"></div><span style="position:relative;top:2px;margin-right:5px">Opacité: </span><input id="spinneralpha'+currentId+'" style="position:relative;width:60px;"></div>');


                        if($j(this).attr("target") != "self"){
                    $j(document).on("pageLoaded",{curId:currentId,target: $j(this).attr("target"),css:$j(this).attr("css"),attr:$j(this).attr("attr")}, function (evt) {

                     switch (evt.data.css) {

                      case "background-color":
                             var bkimg = $j("#myIFrame").contents().find("#"+evt.data.target).get(0).style["backgroundColor"];
                             $j("#colorpicker"+currentId).css("background-color",bkimg);
                       break;


                      default:


                     break;

                     };

                    });
                    };


                                   var spinner = $j("#spinneralpha"+currentId ).spinner();

                    spinner.spinner({
                      max: 1,
                           min:0,
                            step: 0.1,
                          numberFormat: "n",
                      spin: function( event, ui ) {

                    var  obj= $j("#colorpicker"+currentId );
                    var currentColor = obj.css("background-color");
                    var  newColor="";

                          if(currentColor.indexOf("rgba(")>= 0){
                              var lastComma = currentColor.lastIndexOf(',');
                     newColor = currentColor.substring(0,lastComma) +","+ ui.value+ ")";

                          }else{
                        newColor= currentColor.replace(")",", "+ui.value+")");
                          newColor= newColor.replace("rgb(","rgba(");

                          }

                    $j("#colorpicker"+currentId).css('background-color', newColor);
                    setValueToSelected(obj,newColor);
                      }
                    });

                    var  obj= $j("#colorpicker"+currentId );
                    var currentColor = obj.css("background-color");
                      if(currentColor.indexOf("rgba(")>= 0){
                              var lastComma = currentColor.lastIndexOf(',');
                    var alpha = currentColor.substring(lastComma+1);
                          alpha = alpha.replace(")","");
                        //  console.log(alpha);
                          $j("#spinneralpha"+currentId ).spinner( "value", alpha );
                      }else if(currentColor=="transparent"){
                            $j("#spinneralpha"+currentId ).spinner( "value",0 );
                      }else{
                           $j("#spinneralpha"+currentId ).spinner( "value",1 );
                      }
                           //$j("#spinneralpha"+currentId ).spinner( "value", 0.5 );

                                                        $j( "#colorpicker"+currentId ).click(function() {
                                                          //  console.log($j(this).css("background-color"))
                                                            $j("#palette").css("display","none");
                                                           $j("#palette").children().remove();
                                                          var  obj= $j(this);
                      $j.ajax({
                         type: "POST",
                         url: "../sites/"+$j(".currentSite").text()+"/css/colors.xml",
                         success: function(data) {

                    var ar = $j(data).find("colors").text().split("*");
                             //console.log(ar.toString());

                     $j("#palette").css("top",(obj.offset().top+10)+'px');
                     $j("#palette").css("left",(obj.offset().left+20)+'px');

                              $j.each( ar, function( key, value ){

                                  $j("#palette").append('<div id="color'+key+'"style="float:left;margin:2px;border:solid;border-color:grey;cursor:pointer;border-width:1px;width:30px;height:30px;background-color:'+value+'"></div>');
                                  $j("#color"+key).click(function() {
                    setValueToSelected(obj,$j(this).css("background-color"));
                      $j("#spinneralpha"+currentId ).spinner( "value",1 );

                    $j("#colorpicker"+currentId ).css("background-color",$j(this).css("background-color"));
                    //$j(this).parent().remove();
                                    $j("#palette").children().remove();
                                        $j("#palette").css("display","none");
                    });
                              })

                                  $j("#palette").css("display","block");
                                       }

                               });

                    });

                                        break;


 case "form_style_colorpicker":
                          if($j("#palette").length == 0){
                              $j("body").append('<div id="palette" style="position:absolute;overflow:hidden;width:114px;top:0px; left:0px ; box-sizing:border-box;border:solid;border-radius:5px;border-color:grey;padding:2px;box-shadow: 5px 5px 20px 0px #9b9b9b;border-width:1px;background-color:white;display:none"></div>');
                             }
                                            var currentId= getUniqueId();
                                                //   alert($j(this).attr("name"))   ;
                    $j(elem).append('<div id="'+currentId+'" style="display:flex;flex-direction:row;min-height:22px"><div id="colorpicker'+currentId+'" data-name="'+$j(this).attr("name")+'"  style="position:relative;cursor:pointer;min-height:22px;width:100px;font-size:12px;box-sizing:border-box;border:solid;border-color:grey;border-width:1px;margin-left:10px;margin-right:15px;background-color:'+getStyleColor($j(this).attr("className"),$j(this).attr("directive"))+'"   data-css="'+$j(this).attr("css")+'" data-class="'+$j(this).attr("className")+'" data-directive="'+$j(this).attr("directive")+'" data-help="'+$j(this).attr("help")+'"></div><span style="position:relative;top:2px;margin-right:5px">Opacité: </span><input id="spinneralpha'+currentId+'" style="position:relative;width:60px;"></div>');





                                   var spinner = $j("#spinneralpha"+currentId ).spinner();

                    spinner.spinner({
                      max: 1,
                           min:0,
                            step: 0.1,
                          numberFormat: "n",
                      spin: function( event, ui ) {

                    var  obj= $j("#colorpicker"+currentId );
                          //couleur actuelle
                    var currentColor = obj.css("background-color");
                          //---
                    var  newColor="";

                          if(currentColor.indexOf("rgba(")>= 0){
                              var lastComma = currentColor.lastIndexOf(',');
                     newColor = currentColor.substring(0,lastComma) +","+ ui.value+ ")";

                          }else{
                        newColor= currentColor.replace(")",", "+ui.value+")");
                          newColor= newColor.replace("rgb(","rgba(");

                          }

                    $j("#colorpicker"+currentId).css('background-color', newColor);
                        //change couleur actuelle dans la feuille de style
                    setColorValueToClass($j("#colorpicker"+currentId).attr("data-class"),$j("#colorpicker"+currentId).attr("data-directive"),newColor);
                        //----------
                      }
                    });

                    var  obj= $j("#colorpicker"+currentId );
                    var currentColor = obj.css("background-color");
                      if(currentColor.indexOf("rgba(")>= 0){
                              var lastComma = currentColor.lastIndexOf(',');
                    var alpha = currentColor.substring(lastComma+1);
                          alpha = alpha.replace(")","");
                        //  console.log(alpha);
                          $j("#spinneralpha"+currentId ).spinner( "value", alpha );
                      }else if(currentColor=="transparent"){
                            $j("#spinneralpha"+currentId ).spinner( "value",0 );
                      }else{
                           $j("#spinneralpha"+currentId ).spinner( "value",1 );
                      }
                           //$j("#spinneralpha"+currentId ).spinner( "value", 0.5 );

                                                        $j( "#colorpicker"+currentId ).click(function() {
                                                          //  console.log($j(this).css("background-color"))
                                                            $j("#palette").css("display","none");
                                                           $j("#palette").children().remove();
                                                          var  obj= $j(this);
                      $j.ajax({
                         type: "GET",
                         url: "../sites/"+$j(".currentSite").text()+"/css/colors.xml",
                         success: function(data) {

                    var ar = $j(data).find("colors").text().split("*");
                             //console.log(ar.toString());

                     $j("#palette").css("top",(obj.offset().top+10)+'px');
                     $j("#palette").css("left",(obj.offset().left+20)+'px');

                              $j.each( ar, function( key, value ){

                                  $j("#palette").append('<div id="color'+key+'"style="float:left;margin:2px;border:solid;border-color:grey;cursor:pointer;border-width:1px;width:30px;height:30px;background-color:'+value+'"></div>');
                                  $j("#color"+key).click(function() {
                     //change couleur actuelle dans la feuille de style

                       setColorValueToClass($j("#colorpicker"+currentId).attr("data-class"),$j("#colorpicker"+currentId).attr("data-directive"),$j(this).css("background-color"));
                    //---------
                      $j("#spinneralpha"+currentId ).spinner( "value",1 );

                    $j("#colorpicker"+currentId ).css("background-color",$j(this).css("background-color"));
                    //$j(this).parent().remove();
                                    $j("#palette").children().remove();
                                        $j("#palette").css("display","none");
                    });
                              })

                                  $j("#palette").css("display","block");
                                       }

                               });

                    });

                                        break;




case "#":

                          var currentId= getUniqueId();       //
                                                      //  alert("--");


                                       var el = elem;
               if(wdcActiveGroupId !="") {
                el = wdcActiveGroupId;
               }


                                      var myVal =  $j("#myIFrame").contents().find("#"+elemSelected).attr("data-"+$j(this).attr("name"));
                                    if(myVal == undefined){

                                        myVal ="";
                                    }

                                    // console.log("--------->"+myVal+"--"+$j(this).attr("name"))


                                $j(el).append('<div id="sql'+currentId+'" data-name="'+$j(this).attr("name")+'"  style="position:relative;display:block;width:auto;font-size:12px;margin-left:10px;margin-right:20px;border:solid;height:auto;border-color:grey;border-width:1px;padding:2px;margin-right:12px;outline:none" contenteditable="true">'+myVal+'</div>');
                                                     //  $j( "#text"+currentId ).find("input").css("box-sizing" , "border-box");
                                                        $j( "#sql"+currentId ).focus(function() {
                       $j(this).css("background-color","#80e5ed");

                    });
                                                                                            $j( "#sql"+currentId ).blur(function() {
                       $j(this).css("background-color","white");

                    });


                                    if($j(this).attr("name") == "sqlchamps"){
                            $j(document).on("change_div_text",function(e){

                       //console.log($j.attrName)

                             $j("#myIFrame").contents().find("#"+elemSelected).attr("data-sqlchamps",e.val)


                                     e.stopImmediatePropagation();
  e.preventDefault();

                           })




                                }







                                              $j( "#sql"+currentId ).on("keyup",function(e){


                             $j("#myIFrame").contents().find("#"+elemSelected).attr("data-sqlchamps",$j(this).text())


                           })

                    break;


                            } //function


                          //   console.log("type::"+$j(this).attr("type"));

                          }); //each item of xml








// }//success
//  });  //ajax

                                                                               // target tabs-3
  //cache les groupes de ctrl qui ne doivent pas être visibles
   for (var i = 0; i < groups_to_display.length; i++) {

     //    console.log("AAAAAAAAA"+groups_to_display[i].connector+"---"+groups_to_display[i].grpname)

                                  var rqt1  ="[data-connectedTo='"+groups_to_display[i].connector+"']";
                               $j(rqt1).css("display","none");
                                   // console.log(rqt1);
                                      var rqt = "[data-group_name='"+ groups_to_display[i].grpname+"']"
                                            $j(rqt).css("display","block")
                                //  $j("#"+$j(this).val()).css("display","none")












       //  groups_to_display[i].url

    }




 }   ;


function randomNumberId(t) {

         var id = '';
    var charSet = "0123456789";
    charSet = charSet.split("");
            for (var i = 1; i <= t; i++) {
                var randPos = Math.floor(Math.random() * 10);
                id += charSet[randPos];
            }
            return id;
}
function deactivateHrefSelected(){
	$j("#myIFrame").contents().find("#"+elemSelected).find("a").each(function(){
		var href = $j(this).attr("href");
		$j(this).attr("data-href",href);
		 $j(this).attr("href","javascript:void(0)");
	})
}


function cleanShared(){

	decalage = 0;

$j("#myIFrame").contents().find("#"+elemSelected).find(".wdcpaddinghandles").remove();
$j("#myIFrame").contents().find("#"+elemSelected).find(".wdcmarginhandles").remove();
$j("#myIFrame").contents().find("#"+elemSelected).find('.wdcpadding').remove();
$j("#myIFrame").contents().find("#"+elemSelected).find('.wdcsel').remove();
$j("#myIFrame").contents().find("#"+elemSelected).find("*").each(function(){
$j(this).removeAttr('contenteditable')
});
$j("#myIFrame").contents().find("#"+elemSelected).find('a').each(function(){
var href = $j(this).attr("data-href");
$j(this).attr("href",href);
$j(this).removeAttr("data-href");
});
$j("#myIFrame").contents().find("#"+elemSelected).find('.structure').each(function(){

m=0;
if($j("#bt-viewblocks").attr("data-active")=="true"){
		m = parseInt($j(this).css("margin-top"));
		m = (m-15);
		 $j(this).css('margin-top',m+"px");



		 m = parseInt($j(this).css("margin-left"));
		m = (m-15);
		 $j(this).css('margin-left',m+"px");




	 m = parseInt($j(this).css("margin-bottom"));
		m = (m-15);
		 $j(this).css('margin-bottom',m+"px");



m = parseInt($j(this).css("margin-right"));
		m = (m-15);
		 $j(this).css('margin-right',m+"px");

		}
$j(this).removeAttr('data-padding')
$j(this).removeAttr('data-background-color')
$j(this).removeAttr('data-border')
$j(this).removeClass('structure');
$j(this).find('.wdc_label_structure').remove();
$j(this).css("outline","none");

 });

	 $j("#bt-viewblocks").attr("data-active","false");
		 $j("#bt-vue").attr("data-active","true");

}






function addShared(_name){
	cleanShared();
  if(_name){
var uid = wdc_getUniqueId();
  var scriptPhp = "../php/saveShared.php";
  var code = $j("#myIFrame").contents().find("#"+elemSelected).html();
$j.ajax(

{
    url: scriptPhp,
    type: "POST",
   dataType : 'text',
    data: {
        name: cleaner(_name)+uid,
        contenu : code
    },
    success: function(rep) {
        if(rep=="ok"){
//reloadShared(combo_class,_name)
deactivateHrefSelected();
               alert("Sauvegarde du fichier partagé réussie");
        }

    }
});
};
}

function updateShared(_name){
	cleanShared();
  if(_name){
  var scriptPhp = "../php/saveShared.php";
  var code = $j("#myIFrame").contents().find("#"+elemSelected).html();
$j.ajax(

{
    url: scriptPhp,
    type: "POST",
   dataType : 'text',
    data: {
        name: cleaner(_name),
        contenu : code
    },
    success: function(rep) {
        if(rep=="ok"){
//reloadShared(combo_class,_name)
deactivateHrefSelected();
               alert("MAJ du fichier partagé réussie");
        }

    }
});
};
}
function cleaner(filename) {
var f = "none"
    filename= filename.replace(/[èéêë]/g, "e").replace(/[ç]/g, "c").replace(/[àâä]/g, "a").replace(/[ïî]/g, "i").replace(/[ûùü]/g, "u").replace(/[ôöó]/g, "o");
         filename= filename.split(/[^a-zA-Z0-9\-\ \'\_\.]/gi).join('');
     filename= filename.replace(/[']/g, "_");
 filename= filename.replace(/[ ]/g, "-");
 return filemane;
}


function clearEditors(){

  myEditor.setValue("")
  myEditor_css_page.setValue("")
  myEditor_css_insite.setValue("")
  myEditor_css_allsite.setValue("")
  myEditor_js_page.setValue("")
  myEditor_sql.setValue("")
	$j("#code").attr("data-filename","")
$j("#css_local").attr("data-filename","")
$j("#css_global").attr("data-filename","")
$j("#sql").attr("data-filename","")
$j("#javascript").attr("data-filename","")
}
