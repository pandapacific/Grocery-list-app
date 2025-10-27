// // Create, Update, Delete functionalities.
// const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
//     try {
//         const response = await fetch(url, optionsObj);
//         if (!response.ok) throw new Error('Please reload the app.');
//     } catch (err) {
//         errMsg = err.message;
//     } finally {
//         return errMsg;
//     }
// }

// export default apiRequest;


const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        console.log(`Making ${optionsObj?.method || 'GET'} request to:`, url);
        console.log('With options:', optionsObj);
        
        const response = await fetch(url, optionsObj);
        console.log('Response status:', response.status);
        
        const contentType = response.headers.get('content-type') || '';
        let body = null;
        try {
          if (contentType.includes('application/json')) body = await response.clone().json();
          else body = await response.clone().text();
        } catch {}

        console.log('Response body:', body);

        if (!response.ok) {
            throw new Error(typeof body === 'string' ? body : `Server returned ${response.status}: ${response.statusText}`);
        }

        // return parsed JSON when available (useful for callers)
        if (contentType.includes('application/json')) return await response.json();
        return null;
    } catch (err) {
        console.error('Request failed:', err.message);
        errMsg = err.message;
        return errMsg;
    }
}

export default apiRequest;