(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

async function mergeAndDownload() {
  var a = document.getElementsByClassName("flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 lg:px-0 m-auto");


  const styles = Array.from((document.styleSheets));

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

  function downloadHtml(htmlContent, filename) {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.style.display = 'none';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
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
          htmlContent += '@media print {';
          htmlContent += '  body { width: fit-content; zoom:4;}'; // Adjust body for printing
          htmlContent += '}';
          htmlContent += cssContent; // Inject stylesheet content
          htmlContent += '</style>';
          htmlContent += '</head>';
          htmlContent += '<body style="margin:2rem">';
  
          data.forEach(item => {
            htmlContent += '<div style="max-width: 100%; overflow-wrap: break-word;">';
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
  
  const mergedDataResult = mergeArrayElements(a);
  const cssFilePath = styles[0].href;
  
  try {
    const styledHtmlContent = await generateStyledHtml(mergedDataResult, cssFilePath);
    downloadHtml(styledHtmlContent, "gpt2pdf.html");
  } catch (error) {
    console.error(error);
  }
}

// Call the function whenever needed
mergeAndDownload();
console.log("Document generated!");
