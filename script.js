async function mergeAndDownload() {
  var a = document.getElementsByClassName("flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 lg:px-0 m-auto");

  const styles = Array.from((document.styleSheets));
  console.log(styles[0]);

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

  // function downloadJsonFile(data) {
  //   const jsonContent = JSON.stringify(data, null, 2);
  //   const blob = new Blob([jsonContent], { type: "application/json" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "merged_data.json";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // }

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
  
  
  function generateStyledHtml(data) {
    let htmlContent = '<div style="margin:2rem";">';
  
    // Inject stylesheet link
    htmlContent += `<link rel="stylesheet" href=${styles[0].href}>`;
  
    data.forEach(item => {
      htmlContent += '<div>';
      htmlContent += '<h3>Query:</h3>';
      htmlContent += '<p>' + item.query + '</p>';
      htmlContent += '<h3>Response:</h3>';
      htmlContent += '<p>' + (item.response ? item.response : 'N/A') + '</p>';
      htmlContent += '</div>';
    });
  
    htmlContent += '</div>';
  
    return htmlContent;
  }
  
  
  // function generateStyledHtml(data) {
  //   let htmlContent = '<div style="font-family: Arial, sans-serif;">';
  
  //   data.forEach(item => {
  //     htmlContent += '<div>';
  //     htmlContent += '<h3>Query:</h3>';
  //     htmlContent += '<p>' + item.query + '</p>';
  //     htmlContent += '<h3>Response:</h3>';
  //     htmlContent += '<p>' + (item.response ? item.response : 'N/A') + '</p>';
  //     htmlContent += '</div>';
  //   });
  
  //   htmlContent += '</div>';
  
  //   return htmlContent;
  // }
  
  const mergedDataResult = mergeArrayElements(a);
  const styledHtmlContent = generateStyledHtml(mergedDataResult);
  
  
  // console.log(styledHtmlContent); // You can modify this to append or display the HTML as needed

  const content = styledHtmlContent;

  // const apiUrl = 'https://api.docraptor.com/docs';
  // const apiKey = 'QWTsIQvaDnZuMNHFfdH4';
  
  // const requestOptions = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     user_credentials: apiKey,
  //     doc: {
  //       document_content: content,
  //       type: "pdf",
  //       test: true,
  //     },
  //   }),
  // };

  // fetch(apiUrl, requestOptions)
  // .then(response => response.blob())
  // .then(blob => {
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = URL.createObjectURL(blob);
  //   downloadLink.download = 'doc_raptor_sample.pdf';
  //   downloadLink.style.display = 'none';
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  //   document.body.removeChild(downloadLink);
  // })
  // .catch(error => console.error(error));

  downloadHtml(content,"gpt2pdf")
  
  // downloadJsonFile(mergedDataResult);
}

// Call the function whenever needed
mergeAndDownload();
