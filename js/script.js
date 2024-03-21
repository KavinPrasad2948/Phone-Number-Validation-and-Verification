async function validate() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const phoneApiKey = '880bc0fe1e2f4436a394b3f3df5326af'; // Phone Number API key
    const phoneApiEndpoint = `https://phonevalidation.abstractapi.com/v1/?api_key=${phoneApiKey}&phone=${phoneNumber}`;
    const emailApiKey = '48f41e8b5b0342ed84891b83e8adf025'; // Email Validation API key
    const emailApiEndpoint = `https://emailvalidation.abstractapi.com/v1/?api_key=${emailApiKey}&email=${email}`;

    try {
        const phoneResponse = await fetch(phoneApiEndpoint);
        const phoneData = await phoneResponse.json();
        const emailResponse = await fetch(emailApiEndpoint);
        const emailData = await emailResponse.json();

        let validationResults = '';
        if (phoneData.valid) {
            validationResults += `<p class="text-success">Phone Number Validity: Valid</p>`;
            validationResults += `<p>Carrier: ${phoneData.carrier || 'N/A'}</p>`;
        } else {
            validationResults += '<p class="text-danger">Phone Number Validity: Invalid</p>';
        }
        if (emailData.valid) {
            validationResults += `<p class="text-success">Email Validity: Valid</p>`;
        } else {
            validationResults += '<p class="text-danger">Email Validity: Invalid</p>';
        }

        document.getElementById('validationResults').innerHTML = validationResults;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('validationResults').innerHTML = '<p class="text-danger">Error fetching data. Please try again later.</p>';
    }
}
