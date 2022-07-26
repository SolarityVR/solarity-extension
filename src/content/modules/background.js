
window.addEventListener('ReceiveContent', async (evt) => {
	if (evt.detail == "connect-wallet") {
		try {
			(async () => {
				const resp = await window.solana.connect();
				var event = new CustomEvent('ReceiveWallet', { detail: { 'msg': "receive-wallet", 'publicKey': resp.publicKey.toString() } });
				window.dispatchEvent(event);
			})();
		} catch (err) {
			var event = new CustomEvent('ReceiveWallet', { detail: { 'msg': "receive-wallet", 'address': err } });
			window.dispatchEvent(event);
		}
	}
});