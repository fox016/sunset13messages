$(document).ready(function()
{
  $("body").on("change", "#formWrapper input[type='text']", renderMessage);
  $("body").on("change", "#formWrapper textarea", renderMessage);

  $("#formControls .addHeaderBtn").click(function() { addHeader(); });
  $("#formControls .addSubheaderBtn").click(function() { addSubheader(); });
  $("#formControls .addTextBtn").click(function() { addText(); });
  $("body").on("click", "#addFormWrapper .addHeaderBtn", function() { addHeader("", this); });
  $("body").on("click", "#addFormWrapper .addSubheaderBtn", function() { addSubheader("", this); });
  $("body").on("click", "#addFormWrapper .addTextBtn", function() { addText("", this); });

  $("body").on("click", "#addFormWrapper .removeBtn", function()
  {
    $(this).closest(".addForm").remove();
    renderMessage();
  });

  $("#cpyBtn").click(function()
  {
    document.getElementById("sourceHtml").select();
    document.execCommand('copy');
  });

  $("#driveBtn").click(function()
  {
    $("#driveImport").dialog({
      title: "Paste HTML from Google Drive (from .kix-paginateddocumentplugin)",
      modal: true,
      width:700,
      height:350,
      close: function(){$(this).dialog('destroy')},
      buttons:
      [
        {text: "Import", id: "importBtn", click: function(){importFromDrive($("#driveInput").val(), function(){$("#driveImport").dialog('close');})}},
        {text: "Cancel", id: "cancelBtn", click: function(){$(this).dialog('close')}},
      ],
    });
  });

  initWeeklyUpdates();
});

function initWeeklyUpdates()
{
  $("#title").val("Sunset 13th Ward");
  $("#subtitle").val("Weekly Updates");
  /*
  addText("Brothers and sisters,\n\nThis is the Sunset 13th Ward email for the week of <strong>Month Day</strong>. Here is the information for this week:");
  addHeader("Bishopric");
  addHeader("Upcoming Events");
  addHeader("Announcements");
  addSubheader("Come Follow Me Schedule");
  addSubheader("Weekly Cleaning Schedule");
  addHeader("Relief Society");
  addHeader("Elders Quorum");
  addHeader("Young Women");
  addHeader("Young Men");
  addHeader("Primary");
  addHeader("Family History");
  addHeader("Ward Choir");
  addHeader("Other");
  */
  $("#title").trigger('change');
}

function buildHtml()
{
  let html = "";

  // Title
  let title = $.trim($("#title").val());
  if(title != "")
  {
    html += '<p style="display:block;margin:0 0 5px 0;">';
    html += '<span style="font-size:30pt;font-family:Roboto,sans-serif;color:#222222;font-weight:300;">' + title + '</span>';
    html += '</p>';
  }

  // Subtitle
  let subtitle = $.trim($("#subtitle").val());
  html += '<p style="display:block;margin:0 0 40px 0;">';
  html += '<span style="font-size:16pt;font-family:Roboto,sans-serif;font-weight:300;color:#222222;">' + subtitle + '</span>';
  html += '</p>';

  $(".addForm").each(function()
  {
    // Header
    if($(this).hasClass('header'))
    {
      html += '<p style="display:block;color:#ffffff;background-color:#002f5b;font-family:Roboto,sans-serif;padding:10px 10px;margin:30px 0 10px 0;font-size:16pt;font-weight:300;">' + $("input", this).val() + "</p>";
    }

    // Subheader
    else if($(this).hasClass('subheader'))
    {
      html += '<p style="display:block;color:#222222;font-family:Roboto,sans-serif;margin:20px 0 5px 0;font-size:14pt;font-weight:bold;">' + $("input", this).val() + "</p>";
    }

    // Text/html
    else if($(this).hasClass('text'))
    {
      let text = $("textarea", this).val();
      text = text.replace(/\n/g,"<br/>\n");
      text = text.replace(/\r/g,"<br/>\r");
      html += '<p style="display:block;color:#222222;font-family:Roboto,sans-serif;margin:5px 0;font-size:12pt;">' + text + "</p>";
    }
  });

  return html;
}

function renderMessage()
{
  let html = buildHtml();
  $("#displayDiv").html(html);
  $("#sourceHtml").val(html);
}

function addHeader(text, after)
{
  if(typeof text !== "string")
    text = "";
  let i = $(".addForm.header").length;
  let html = "<div class='addForm header'><div><label for='header"+i+"'>Header</label><button class='removeBtn'>remove</button></div><input type='text' id='header"+i+"' value='"+text+"'><div class='addFormControls'><button type='button' class='controlBtn addHeaderBtn'>+ Add Header</button><button type='button' class='controlBtn addSubheaderBtn'>+ Add Subheader</button><button type='button' class='controlBtn addTextBtn'>+ Add Text</button></div></div>";
  if(typeof after === "undefined")
    $("#addFormWrapper").append(html);
  else
    $(after).closest(".addForm").after(html);
}

function addSubheader(text, after)
{
  if(typeof text !== "string")
    text = "";
  let i = $(".addForm.subheader").length;
  let html = "<div class='addForm subheader'><div><label for='subheader"+i+"'>Subheader</label><button class='removeBtn'>remove</button></div><input type='text' id='subheader"+i+"' value='"+text+"'><div class='addFormControls'><button type='button' class='controlBtn addHeaderBtn'>+ Add Header</button><button type='button' class='controlBtn addSubheaderBtn'>+ Add Subheader</button><button type='button' class='controlBtn addTextBtn'>+ Add Text</button></div></div>";
  if(typeof after === "undefined")
    $("#addFormWrapper").append(html);
  else
    $(after).closest(".addForm").after(html);
}

function addText(text, after)
{
  if(typeof text !== "string")
    text = "";
  let i = $(".addForm.text").length;
  let html = "<div class='addForm text'><div><label for='text"+i+"'>Text/HTML</label><button class='removeBtn'>remove</button></div><textarea id='text"+i+"'>"+text+"</textarea><div class='addFormControls'><button type='button' class='controlBtn addHeaderBtn'>+ Add Header</button><button type='button' class='controlBtn addSubheaderBtn'>+ Add Subheader</button><button type='button' class='controlBtn addTextBtn'>+ Add Text</button></div></div>";
  if(typeof after === "undefined")
    $("#addFormWrapper").append(html);
  else
    $(after).closest(".addForm").after(html);
}

function importFromDrive(htmlIn, callback)
{
  $("#driveParser").html(htmlIn);
  $(".removeBtn").each(function(){$(this).trigger("click");});
  $(".kix-paragraphrenderer", "#driveParser").each(function()
  {
    let text = "";
    let size = 0;
    $(".kix-wordhtmlgenerator-word-node", this).each(function()
    {
      size = parseFloat(this.style['font-size'].replace(/px/g, ""));
      if($(this).parent().prop("tagName") == "A")
      {
        let href = $(this).parent().attr('href');
        text += "<a href='"+href+"'>" + $(this).text() + "</a>";
      }
      else
      {
        let weight = parseInt(this.style['font-weight']);
        if(weight == 700 && size < 21)
          text += "<strong>" + $(this).text() + "</strong>";
        else
          text += $(this).text();
      }
    });
    if(text != "")
    {
      if(size >= 26)
        addHeader(text);
      else if(size >= 21)
        addSubheader(text);
      else
        addText(text);
    }
  });
  renderMessage();
  callback();
}
