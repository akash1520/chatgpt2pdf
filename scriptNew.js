async function mergeAndDownload() {
    var a = document.getElementsByClassName("flex p-4 gap-4 text-base md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl md:py-6 lg:px-0 m-auto");
  
    const styles = Array.from((document.styleSheets));
    const stylesheet = styles[0].href
  

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
  
    function generateStyledHtml(data, styles) {
      let htmlContent = '<div style="font-family: Arial, sans-serif;">';
  
      data.forEach(item => {
        htmlContent += '<div style="';
        const selector = 'div'; // Customize as needed based on your HTML structure
        const styleProps = styles[selector];
        if (styleProps) {
          Object.entries(styleProps).forEach(([name, value]) => {
            htmlContent += `${name}:${value};`;
          });
        }
        htmlContent += '">';
        htmlContent += '<h3>Query:</h3>';
        htmlContent += '<p>' + item.query + '</p>';
        htmlContent += '<h3>Response:</h3>';
        htmlContent += '<p>' + (item.response ? item.response : 'N/A') + '</p>';
        htmlContent += '</div>';
      });
  
      htmlContent += '</div>';
  
      return htmlContent;
    }
  
    const mergedDataResult = mergeArrayElements(a);
    const cssFileUrl = stylesheet; // Replace with your CSS file URL or path
  
    try {
      const cssContent = await fetch(cssFileUrl).then(response => response.text());
      const styles = parseCSS(cssContent);
      const styledHtmlContent = generateStyledHtml(mergedDataResult, styles);
      const content = styledHtmlContent;
  
      // Use your PDF generation API or method here
      // For example, with DocRaptor:
      const apiKey = 'QWTsIQvaDnZuMNHFfdH4';
      const apiUrl = 'https://api.docraptor.com/v2/documents';
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doc: {
            content: content,
            type: 'pdf',
          },
          apiKey: apiKey,
        }),
      };
  
      const response = await fetch(apiUrl, requestOptions);
      const blob = await response.blob();
  
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'merged_data.pdf';
      downloadLink.style.display = 'none';
  
      document.body.appendChild(downloadLink);
      downloadLink.click();
  
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error(error);
    }
  }
  
  function parseCSS(cssContent) {
    const styles = {};
    cssContent.split('}').forEach(rule => {
      const [selectors, properties] = rule.split('{');
      if (selectors && properties) {
        const selectorList = selectors.trim().split(',');
        const styleProps = properties
          .split(';')
          .filter(prop => prop.trim() !== '')
          .reduce((props, prop) => {
            const [name, value] = prop.split(':');
            if (name && value) {
              props[name.trim()] = value.trim();
            }
            return props;
          }, {});
        selectorList.forEach(selector => {
          styles[selector.trim()] = styleProps;
        });
      }
    });
    return styles;
  }
  
  // Call the function whenever needed
  mergeAndDownload();
  