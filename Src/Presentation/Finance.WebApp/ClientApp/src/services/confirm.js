const options = {
    title: 'Title',
    message: 'Message',
    buttons: [
        {
            label: 'Yes',
            onClick: () => alert('Click Yes')
        },
        {
            label: 'No',
            onClick: () => alert('Click No')
        }
    ],
    childrenElement: () => <div />,
    customUI: ({ title, message, onClose }) => <div>Custom UI</div>,
    willUnmount: () => { }
}

confirmAlert(options)