export default {
    uploadFileToCustomer(payload) {
        let formData = new FormData();
        formData.append('file', payload.file);
        return $.ajax(`/upload-file/${payload.customerId}`, {
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false
        });
    },
}