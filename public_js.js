document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            try {
                const response = await fetch(`/transaction/${id}`, {
                    method: 'DELETE'
                });
                const data = await response.json();
                if (data.success) {
                    button.parentElement.remove();
                } else {
                    console.error('Delete operation failed');
                }
            } catch (err) {
                console.error('Error:', err);
            }
        });
    });
});
