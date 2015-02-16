/*------------------

	Custom Dropdown Widget by Himanshu Hiranandani
	Original Code revamped on 9/11/14

---------------------*/
/*--------------------
	Functionality overview:

	HTML required: 

	<select id="customDropdownID" class="hpStyleDropdown">
		<option value="val1"> Value 1</option>
		<option value="val2"> Value 2</option>
	</select>

	output:

	<div id="customDropdownID_custom" class="customDropdownBox">
		<div id="customDropdownID_custom_headerBox" class="trigger">
			<a href="javascript:;" id="customDropdownID_custom_headerLink" /> 
				<span id="customDropdownID_custom_headerValue"></span>
				<span id="customDropdownID_custom_headerArrow"></span>
			</a>
		</div>
		<ul>
			<li> Value 1
			<span class="hide value">val1</span>
			</li>
		
		
			<li> Value 2
			<span class="hide value">val2</span>
			</li>
			.
			.
			.
			.

			<li>

			</li>
		</ul>


	</div>

--------------*/

	//convert every select element with class as customDropdown to a custom look
	
	/*
	
		Steps to follow
		1. Check if the element has been customized already  --> checkForCustomDropdown()
		2. Hide the select tag based on ID --> hideSelectById()
		3. create CustomDropdown Structure --> createCustomDropdownStructure()
		4. Populate Header box
		5. Populate List
			For each list item
			5.1 Append Value
			5.2 Append custom attributes as spans
		6. Add click handler for list items
		7. Add typeahead search listener
			7.1 add 500ms listener for typeahead
			7.2 on changing the element change header value

	*/


customizeDropdowns  = function(){
	//this will act as the init function
	
	$('select.customDropdown').each(function(){

			//get slect tag id
			var actualElId  = $(this).attr('id');

			

			if(checkForCustomDropdown(actualElId)){
					hideSelectById(actualElId);
					createCustomDropdownStructure(actualElId);
					attachClickHandler(actualElId);
					attachKeyboardListeners(actualElId);
					attachChangeListener(actualElId);
			}



	});






}



checkForCustomDropdown = function(elId){
	// elId = Id of the select tag
	//check if element with id = <elId>_custom exists
	if($('#'+elId+'_custom').length<1){
		//element doesnt exist, return true to create element
		return true;
	}
	else{
		//element exists, return false to not recreate element
		return false;
	}

};

hideSelectById = function(elId){

	if(! $('#'+elId).hasClass('hide')){
		$('#'+elId).addClass('hide');
	}

};





createCustomDropdownStructure = function(actualElId){

	var DropdownContainerId = actualElId+'_custom';
	var DropdownContainer = $('<div id="'+ DropdownContainerId +'" class="dropdown dropdownContainer customDropdown"></div>');

	var DropdownTriggerAnchorId = actualElId+'_custom_headerLink';
	var DropdownTabIndex = $('#'+actualElId).attr('tabindex');
	var DropdownTriggerAnchor = $('<a id="'+ DropdownTriggerAnchorId +'" tabindex="'+DropdownTabIndex+'" data-toggle="dropdown" href="javascript:;" class="dropdownHeaderLink"></a>');


	var DropdownTriggerValueId = actualElId+'_custom_headerValue';
	var DropdownTriggerValue = $('<span id="'+ DropdownTriggerValueId +'" class="dropdownHeaderValue"></span>');

	var DropdownIcon = $('<i class="fa fa-chevron-down "></i>');


	
	$(DropdownTriggerAnchor).append(DropdownTriggerValue);
	$(DropdownTriggerAnchor).append(DropdownIcon);
	
	$(DropdownContainer).append(DropdownTriggerAnchor);


	var DropdownListId = actualElId+'_custom_list';
	var DropdownList = $('<ul id="'+ DropdownListId +'" role="menu" class="dropdown-menu" class="dropdownList"></ul>');

	$(DropdownContainer).append(DropdownList);	

	//insert the custom container after the select tag
	DropdownContainer.insertAfter($('#'+actualElId));

	//populate the list items
	populateDropdownList(actualElId, DropdownListId);

	//Populate the Dropdown Header Value
	valueReq = $('#'+actualElId).attr('valuereq')
	if(valueReq!=null && valueReq!="" ){
		var valObtained = getParameterByName(valueReq)?getParameterByName(valueReq):'';
		if(valObtained != null && valObtained != ''){
			valObtained = valObtained.toLowerCase();
			
		}
		populateDropdownHeader(actualElId, valObtained);
	}
	else{
		populateDropdownHeader(actualElId, "");
	}
		





};

populateDropdownHeader = function(elId, val){



	//set the dropdown Header Value to the first elem
		var firstVal = $($('#'+elId).children('option')[0]).html();
		$('#'+elId+'_custom_headerValue').empty().append(firstVal);
		$('#'+elId+'_custom_headerValue').addClass('default');
		//set the hidden dropdown value
		$('#'+elId).val(0)


	

	if(val!="" ){
			var elem = "";
		 $('#'+elId+'_custom_list li.elem').each(function(){
				if($(this).attr('value')!=undefined && $(this).attr('value')==val){
						//set the dropdown Header Value to the found elem
						 elem = $(this).html();
						 $('#'+elId+'_custom_headerValue').empty().append(elem);
						 //set the hidden dropdown value
						 $('#'+elId).val(val);
				} 

		 })


		
		
	}



};

populateDropdownList = function(elId, listId){

	$('#'+elId).children('option').each(function(){

		var listItem = $('<li class="elem"></li>');
		
		var el = $(this);
		var listData = el.html();

		$(listItem).append(listData);
		
		
		for (var i = 0, atts = el[0].attributes, n = atts.length, arr = []; i < n; i++){
		   
		    if (atts[i].nodeName != 'id' || atts[i].nodeName != 'class') {

		    	listItem.attr(atts[i].nodeName, atts[i].value);

		    };

		    
		}

		$('#'+listId).append(listItem);

	});
	

};

attachClickHandler = function(elId){

	$('#'+elId+'_custom_list li').on('click', function(){

		//set value in the hidden select tag
		//populate header value
		selValue = $(this).attr('value');
		$('#'+elId).val(selValue);

		populateDropdownHeader(elId, selValue);
		$('#'+elId).trigger('change');

	});




};

attachKeyboardListeners = function(elId){


			//keydown evets for esc/bcksp/tab
			$('#'+elId+'_custom').on('keydown', function(e) {
			
			if(e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ){
			//if the user hits backspace, esc, or tab it should close the dropdown
				if($(this).hasClass('open')){
				e.preventDefault();
				$(this).removeClass('open');
				}
			}

			});


			//keypress events for typeahead
			$('#'+elId+'_custom').on('keypress', function(e) {
			if(e.keyCode != 37 || e.keyCode != 38 || e.keyCode != 39 || e.keyCode != 40){
			
				key = String.fromCharCode(e.charCode != null ? e.charCode : e.keyCode);
				//console.log(key + "-pressed Key")
				clearTimeout(timeOutResetLetters);
				timeOutResetLetters = setTimeout(function(){
					letterPressed = [];
				},500);
				letterPressed.push(key);
				//console.log(letterPressed);
				//console.log(letterPressed.join(''));
				//console.log('before - '+typeAheadText+', '+typeAheadCounter);
				if(getTyped() == letterPressed.join('')){
					setTyped(letterPressed.join(''));
					setCounter(getCounter()+1);
				}
				else{
					setCounter(1);
					setTyped(letterPressed.join(''));
				}
				//console.log('after - '+typeAheadText+', '+typeAheadCounter);
				typeahead(letterPressed.join(''), this);
				}
			});	



			//To handle typeahed for more than once
			$('#'+elId+'_custom').on('blur', function(e) {
				setCounter(1);
				setTyped('');
			});
			
			$('#'+elId+'_custom ul > li').on('mouseover', function(e) {
				setTypeAhead(this);
			});


};


typeahead = function(what, elem){
	var els = $('#'+$(elem).attr('id')+' .elem').filter(function(index) {
  		return $(this).html().toLowerCase().search(what) == 0;
	});
	console.log(typeAheadCounter);
	var index = (typeAheadCounter - 1) % els.length;
	if(els && els.length > 0 && els[index] && els[index].childNodes[0]){
		els[index].childNodes[0].focus();
	}
}

setTypeAhead = function(el){
	var hoveredEl = $(el);
	var hoveredChar = hoveredEl.html().toLowerCase().split('<')[0][0];
	setTyped(hoveredChar);
	setCounter(0);


	/* var i = 1;   //TODO: revisit for mouse hover logic
	var els = hoveredEl.parent().children('.elem').filter(function(index) {
  		return $(this).children('a').html().toLowerCase().search(hoveredChar) == 0;
	});
	
	while(i < els.length){
		console.log(hoveredEl+' == '+els);
		if(hoveredEl == els[i-1]){
			setCounter(i);
			console.log(hoveredChar+', '+i);
		}
		i+=1;
	} */	


}

var letterPressed = [];
var timeOutResetLetters = null;
var typeAheadCounter = 1;
var typeAheadText = '';

function setCounter(val)
{
    typeAheadCounter = val;
}

function getCounter()
{
    return typeAheadCounter;
}
function setTyped(val)
{
    typeAheadText = val;
}

function getTyped()
{
    return typeAheadText;
}


getSelectedData = function(opt,elID){

	var elem = $('#'+elID+'_custom_headerValue');

	return $(elem).attr(opt);

}

attachChangeListener = function(elId){
	$('#'+elId).on('change',function(){

		var currentValue = $(this).val();
		populateDropdownHeader(elId, currentValue);

	})

}




//get value from get params in the URL
function getParameterByName(name) {
 
 	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
 
}