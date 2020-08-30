function confirmation(milliseconds, url, language) {	
	var answer;  
    var currentURL;
    var newURL = url;
    
	if (language == "es") {
		answer = confirm("Se acerca el l�mite por p�gina.  Para evitar que salga, seleccione OK para continuar trabajando.")
	} else {
		answer = confirm("You are nearing the time limit for being on one page. To prevent being logged off, select OK to continue working.")
	}
	if (answer){
                currentURL = $(location).attr('href');
                if (currentURL.indexOf("https")==0)
                {
                  if (newURL.indexOf("https")!=0)
                  {
                	  newURL = newURL.replace("http://","https://");
                  }
                }
		$.get(newURL);
		set_timeout(milliseconds, newURL, language);
	}
}

function set_timeout(milliseconds, url, language) {
	
	window.setTimeout(function() {confirmation(milliseconds, url, language);}, milliseconds);
}
//
// Sets focus the first non-hidden, non-drop-down element in the page
//
function autoFirstFocus() 
{
  // If there is a form in the doc...
  if ( document.forms[0] ) 
  {
	var theElems = document.forms[0].elements;
	if ( !theElems )
	{
		return;
	}

    // loop over the elements until finding a non-hidden one
    for (i = 0; i < theElems.length; i++) 
    {
      theElem = theElems[i];

	  // Netscape workaround, skip undefined elements
	  if ( !theElem.type && !theElem.name ) 
	  {
		  continue;
	  }

	  //Avoid specified field types
      if (theElem.type && 
      	(theElem.type == "text" || 
      	 theElem.type == "radio" ||
      	 theElem.type == "checkbox" ||
      	 theElem.type == "password" ||      	 
      	 theElem.type == "textarea")) 
	  {
      	 theElem.focus();
        break;
      }
      
      if (theElem.type &&
      		( theElem.type == "hidden"  ))
      {
      	continue;
      }
      
      break;
    }
  }
}

// Use:  To disable a Submit button once it is clicked, 
//		 add a hidden field to the form with the 
//		 same name and value as the submit button 
//		 and then submit the form
function disableSubmitButton(button) {

	button.disabled = true;
	
	var hiddenField = document.createElement("input");
	hiddenField.type = "hidden";
	hiddenField.name = button.name;
	hiddenField.value = button.value
	
	var form = button.form;
	form.appendChild(hiddenField);
	form.submit();
}

// Use:  To limit textarea size to "maxlimit" characters
// See examples at end of file
function limitTextArea(field, maxlimit, counterField ) {
	var fldLength = trueLength(field);
	if (fldLength > maxlimit) // if too long...trim it!
		field.value = field.value.substring(0, maxlimit);
	
	var charsLeft = maxlimit - fldLength;	
	if (charsLeft < 0) charsLeft = 0;
	
	if ( counterField == null )
	{
		window.status = charsLeft > 0 ? 
							charsLeft + " Characters remaining." :
							"Maximum length reached (" + maxlimit + ")";
	}
	else
	{
		counterField.value = charsLeft;
	}
}		

// Render a borderless textfield on the page that updates the
// characters remaining as you type
// textarea, maxlimit, label, and size are optional parameters
// But textarea and maxlimit must be specified in order to get
// a correct initial character count
function renderTextAreaCounter(fieldId, textarea, maxlimit, label, size)
{
	// Defaults
    var fldLength = trueLength(textarea);	
	var initialValue = (textarea != null && maxlimit != null) ? maxlimit - fldLength : "";
	size = size != null ? size : 1; // will hold most reasonable values
	label = label != null ? label : "";
	
	// Handle broken netscape 6.1 text align bug
	var align="text-align: right;"
	if ( navigator.appName.charAt ( 0 ) == 'N' && navigator.appVersion.charAt(0) <= 6 )
	{
		align = "";
	}

	if (textarea.disabled!=true)
	{
	// Write the control
	document.write ( '<label><input readonly id="' + fieldId + '" size="' + size + 
						'" value="' + initialValue + 
						'" style="border:0px; ' + align + '; background-color:transparent;color:black;"> ' + label +'</label>');	
	}
}

function trueLength(field)
{
    var crCount = 0;
    var crs = field.value.match(/\r/);
    if (null != crs) crCount = crs.length - 1;
    return field.value.length + crCount;
}

// This example will put the characters left into the window status bar:
//
//  <textarea name="message" wrap="virtual" 
//  	onKeyUp="limitTextArea(this,1000);">


// If you want to have an on page character remaining counter, do
// something like this:
//
// <textarea cols="75" rows="5" id="commentText"
//		onKeyUp="limitTextArea(this,250,document.pageForm.commentTextCounter);"></textarea>
//
// <script>
//		renderTextAreaCounter("commentTextCounter", document.pageForm.commentText, 250, "Characters left." ) 
// </script>			
// <noscript>
//		- approximately 3 lines
// </noscript>	

// Notice that the renderTextAreaCounter is in a <script> tag, this tells the page to
// hide the field and label if javascript is not available