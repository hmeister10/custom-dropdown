	Custom Dropdown Widget by Himanshu Hiranandani
	Original Code revamped on 9/11/14


	This is a customized dropdown widget which can be plugged into any project.
	
	It is a further customized version of the Bootstrap dropdown component, with the addition of few missing features to make the dropdown behave like a default HTML dropdown

	Some frameworks needed for the widget to work include
	 - jQuery
	 - Bootstrap

	Usage Instructions:

	1. Create a regular HTML dropdown using the select-option tags
	2. Give the select tag an ID of your choice and the class "customDropdown"
	3. On DOM ready call the function - customizeDropdowns()


	HTML REQUIRED: 
		<select id="customDropdownID" class="customDropdown">
			<option value="val1"> Value 1</option>
			<option value="val2"> Value 2</option>
		</select>


	OUTPUT:
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

