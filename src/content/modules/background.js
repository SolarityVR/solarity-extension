
window.addEventListener('ReceiveContent', async (evt) => {
	if (evt.detail=="connect-wallet") {
		try {
			const resp = await window.solana.connect();
			var event = new CustomEvent('ReceiveWallet', {detail: { 'msg': "receive-wallet", 'publicKey': window.solana }});
			window.dispatchEvent(event);
		} catch (err) {
			var event = new CustomEvent('ReceiveWallet', {detail: { 'msg': "receive-wallet", 'address': "#ERROR" }});
			window.dispatchEvent(event);
		}
	}
});