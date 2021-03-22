<!DOCTYPE HTML>
<html>
<head>
  <title>Format Ward Messages</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Condensed:300,400,500,700" rel="stylesheet">
  <link rel="shortcut icon" href="https://www.byu.edu/templates/stable/images/favicon.ico">
  <script src="js/messages.js"></script>
  <link rel="stylesheet" type="text/css" href="css/messages.css"/>
</head>
<body>
  <h1 id='pageTitle'>Format Messages</h1>
  <div id='wrapper'>
    <div id='formWrapper'>
      <div id='formControls'>
        <button type='button' class='controlBtn addHeaderBtn'>+ Add Header</button>
        <button type='button' class='controlBtn addSubheaderBtn'>+ Add Subheader</button>
        <button type='button' class='controlBtn addTextBtn'>+ Add Text</button>
      </div>
      <div><label for='title'>Title</label></div>
      <input type='text' id='title' style='margin-bottom:25px'>
      <div><label for='subtitle'>Subtitle</label></div>
      <input type='text' id='subtitle' style='margin-bottom:25px'>
      <div id='addFormWrapper'>
      </div>
    </div>
    <div id='displayWrapper'>
      <div id='ioControls'>
        <button id='driveBtn'>Import from Google Drive HTML</button>
        <button id='cpyBtn'>Copy Source HTML to Clipboard</button>
      </div>
      <div id='displayDiv'>
        <span id='displayInit'>Fill out the form to populate display</span>
      </div>
      <textarea id='sourceHtml'>
      </textarea>
    </div>
  </div>
  <div id='driveImport' style='display:none'>
    <textarea id='driveInput'></textarea>
    <div id='driveParser' style='display:none'></div>
  </div>
</body>
</html>
