function openStyledHtmlInNewTab(htmlContent) {
  const newTab = window.open();
  newTab.document.write(htmlContent);
  newTab.document.close();

  // Wait for the new tab to finish loading
  newTab.onload = function () {
    // Trigger print
  newTab.print()

    // Close the new tab after a short delay
    setTimeout(function () {
      newTab.close();
    }, 1000);
  };
}

function mergeArrayElements(arr) {
  const mergedArray = [];
  for (let i = 0; i < arr.length; i += 2) {
    if (i + 1 < arr.length) {
      const mergedItem = {
        query: arr[i].innerHTML,
        response: arr[i + 1].innerHTML
      };
      mergedArray.push(mergedItem);
    } else {
      // Handle odd number of elements (last element)
      mergedArray.push({ query: arr[i].innerText, response: null });
    }
  }
  return mergedArray;
}


function generateStyledHtml(data, cssFilePath) {
  return new Promise((resolve, reject) => {
    // Load the CSS file content
    fetch(cssFilePath)
      .then(response => response.text())
      .then(cssContent => {
        let htmlContent = '<html>';
        htmlContent += '<head>';
        htmlContent += '<style>';
        htmlContent += ` body {
           width: fit-content;
           margin:2rem;
          }`; // Adjust body for printing
        htmlContent += cssContent; // Inject stylesheet content
        htmlContent += '</style>';
        htmlContent += '</head>';
        htmlContent += '<body style="margin:2rem">';

        data.forEach(item => {
          htmlContent += '<div>';
          htmlContent += '<h3>Query:</h3>';
          htmlContent += '<p>' + item.query + '</p>';
          htmlContent += '<h3>Response:</h3>';
          htmlContent += '<p>' + (item.response ? item.response : 'N/A') + '</p>';
          htmlContent += '</div>';
        });
        htmlContent += '</body>';
        htmlContent += '</html>';

        resolve(htmlContent);
      })
      .catch(error => {
        reject(error);
      });
  });
}


async function htmlToDownload(){
  
  var a = document.getElementsByClassName("flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl md:py-6 lg:px-0 m-auto");


  const styles = Array.from((document.styleSheets));

  const mergedDataResult = mergeArrayElements(a);
  const cssFilePath = styles[0].href;
  
  const styledHtmlContent = await generateStyledHtml(mergedDataResult, cssFilePath);
  openStyledHtmlInNewTab(styledHtmlContent)
}

htmlToDownload()



