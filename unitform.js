
/*--------------------------------------------------------------------------------------------------------------

	JQuery Unitform Plug-in (v2.1)

		by Chris Lawes

--------------------------------------------------------------------------------------------------------------*/

$.fn.unitform = function(options)
{

	/*----------------------------------------------------------------------------------------------------------

		SETTINGS

	----------------------------------------------------------------------------------------------------------*/

	var $self = $(this.selector);

	// defaults (fallback values if nothing is passed in from defining plugin)
	var defaults = {
		fileHelperText 		: 'No File Selected.',
		fileHelperButton 	: 'Upload'
	};

	// use config.var to use user option with defult fallback
	var config = $.extend({}, defaults, options);

	/*----------------------------------------------------------------------------------------------------------

		GLOBAL HELPERS

	----------------------------------------------------------------------------------------------------------*/

	var HELPER = {

		// global helper - check if this selector is checked and change parent class
		// @param {array} selector - jquery selector
		// called on radios and checkboxes
		ifChecked: function(selector)
		{

			if ($(selector).is(':checked'))
			{

				$(selector).parent('span').addClass('checked');

				// if this element is inside a "label" tag,
				// add a class to that label
				if ($(selector).parents('label').length == 1)
				{
					$(selector).parents('label').addClass('unitform_label');
				}

			}
			else
			{

				$(selector).parent('span').removeClass('checked');

				// if this element is inside a "label" tag,
				// remove a class to that label
				if ($(selector).parents('label').length == 1)
				{
					$(selector).parents('label').removeClass('unitform_label');
				}

			}

		},

		// global helper for focus class on form elements
		onFocus: function(selector)
		{

			$(selector).parent('div').addClass('unitform_focus');
		
		},

		// global helper to remove focus class on form elements
		onBlur: function(selector)
		{

			$(selector).parent('div').removeClass('unitform_focus');
		
		},

		// pinch any class names on the select
		// remove, and put them on the new 'unitform_select' wrapper
		moveClass: function(selector)
		{
			
			// grab the class to carry up
			var thisSelectClass = $(selector).attr('class');

			// if we have something to carry
			if (thisSelectClass)
			{
				// assume we're in a div (.unitform_*)
				var wrapperType = 'div';

				// if it's inside a label, add them to that
				if ($(selector).parents('label').length == 1)
				{
					wrapperType = 'label';
				}
				
				// remove from this, add to something else
				$(selector).removeClass( thisSelectClass ).parent().closest( wrapperType ).addClass( thisSelectClass );
				
			}

		}

	};

	/*----------------------------------------------------------------------------------------------------------

		FORM FUNCTIONS

	----------------------------------------------------------------------------------------------------------*/

	/**
	 *	Form functions
	 *	[*]_markup, [*]_onChange - for each (select, radio, check, file)
	 */

	var FORM = {

		/*------------------------------------------------------------------------------------------------------

			SELECT

		------------------------------------------------------------------------------------------------------*/

		// change selectbox markup; add wrapper, span for value (+ span for arrow?)
		// @param {array} selector - jquery selector
		select_markup: function(selector)
		{

			// add wrapper and spans for value (and em for arrow)
			$(selector).wrap('<div class="unitform_select"></div>').parent().append('<span>' + $(selector).find('option:selected').text() + '</span> <em>Arrow</em>');

			// keep element class (move from form element, to html wrapper)
			HELPER.moveClass(selector);

			// move disabled attribute if present

			if($(selector).attr('disabled')) 
			{
				$(selector).parent().addClass('unitform_disabled');
			}

		},

		// on change (selectbox) - change class and 1st span content
		// @param {array} selector - jquery selector
		select_onChange: function(selector)
		{

			// find new value, pass to parents span
			$(selector).parent().find('span').html( $(selector).find('option:selected').text() );

		},

		/*------------------------------------------------------------------------------------------------------

			RADIO

		------------------------------------------------------------------------------------------------------*/

		// change radio markup function 
		// use: check if already checked (on load) and toggle class
		// use: bind to click to toggle active class
		// @param {array} selector - jquery selector
		radio_markup: function(selector)
		{

			// add wrapper
			$(selector).wrap('<div class="unitform_radio"><span></span></div>');

			// if it's already checked, add checked class
			HELPER.ifChecked(selector);

			// keep element class (move from form element, to html wrapper)
			HELPER.moveClass(selector);

		},

		// on change (radio) - change class of this if the thing (passed in) un/checked
		// remove checked class from all other radios in this group
		// @param {array} selector - jquery selector
		radio_onChange: function(selector)
		{

			// find the group this radio belongs to (via their shared name)
			var thisGroupName = $(selector).attr('name');

			// if this radio is in a group
			if (thisGroupName.length)
			{

				// loop all radios with this name, uncheck and remove active class
				$('input:radio[name=' + thisGroupName +']').each(function()
				{
					$(this)
						.prop('checked', false).parent('span').removeClass('checked');

					if ($(this).parents('label').length == 1)
					{
						$(this).parents('label').removeClass('unitform_label');
					}

				});

			}

			// add active class to the one clicked
			$(selector)
				.prop('checked', true).parent('span').addClass('checked');

			if ($(selector).parents('label').length == 1)
			{
				$(selector).parents('label').addClass('unitform_label');
			}

		},

		/*------------------------------------------------------------------------------------------------------

			CHECKBOX

		------------------------------------------------------------------------------------------------------*/

		checkbox_markup: function(selector){

			// add wrapper
			$(selector).wrap('<div class="unitform_checkbox"><span></span></div>');

			// if it's already checked, add checked class
			HELPER.ifChecked(selector);

			// keep element class (move from form element, to html wrapper)
			HELPER.moveClass(selector);

		},

		// on change (checkbox) - change class of this if the thing (passed in) un/checked
		checkbox_onChange: function(selector)
		{

			// run if checked helper function
			HELPER.ifChecked(selector);

		},

		/*------------------------------------------------------------------------------------------------------

			FILE

		------------------------------------------------------------------------------------------------------*/

		// add unitform wrapper, text holder (span) and dummy button
		file_markup: function(selector){

			$(selector).wrap('<div class="unitform_file"></div>').parent().append('<span>' + config.fileHelperText + '</span> <em>' + config.fileHelperButton + '</em>');

		},

		// update new span tag with value (file name) when one is added
		file_onChange: function(selector){

			var uploadFileName = $(selector).val().split('/').pop(); // get this file name, without "fake/path/"

			$(selector).parent().find('span').text( uploadFileName );

		}

	};


	/*----------------------------------------------------------------------------------------------------------

		MAIN PLUG-IN

		Bind helper/form functions to actions on each form element

	----------------------------------------------------------------------------------------------------------*/


	// don't run if none of the elements are on this page
	if ($self.length)
	{

		// for each form element passed in
		$self.each(function()
		{

			// get element type (select or radio or file ...etc)
			var type = this.type || this.tagName.toLowerCase(),
				typeName = type.split('-')[0];
			
			// change markup form function
			FORM[typeName + '_markup'](this);

			// bind change form function to this
			$(this).bind('change', function()
			{
				FORM[typeName + '_onChange'](this); // find helper using the name of this element
			});

			// bind focus helper function to this
			$(this).bind('focus', function()
			{
				HELPER.onFocus(this);
			});

			// bind blur helper function to this
			$(this).bind('blur', function()
			{
				HELPER.onBlur(this);
			});

		}); // end; each element

	} // end; if length


}; // End; unitform plug-in
