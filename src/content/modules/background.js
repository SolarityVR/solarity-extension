
window.addEventListener('login', async (evt) => {
	if (evt.detail.command == "wallet-connection") {
		try {
			(async () => {
				const resp = await window.solana.connect();
				var event = new CustomEvent('login-result', { detail: { 'msg': "wallet-connected", 'publicKey': resp.publicKey.toString() } });
				window.dispatchEvent(event);
			})();
		} catch (err) {
			var event = new CustomEvent('login-result', { detail: { 'msg': "wallet-not-connected", 'err': err } });
			window.dispatchEvent(event);
		}
	}

	if (evt.detail.command == "get-signature") {
		try {
			(async () => {
				const { nonce, publicKey, walletType } = evt.detail;
				const signature = await signMessage(
					walletType,
					nonce,
					window.solana,
					publicKey
				);
				var event = new CustomEvent('login-result', { detail: { 'msg': "receive-signature", 'signature': signature, publicKey, walletType } });
				window.dispatchEvent(event);
			})();
		} catch (err) {
			var event = new CustomEvent('login-result', { detail: { 'msg': "wallet-not-connected", 'err': err } });
			window.dispatchEvent(event);
		}
	}
});

// other Functions
const signMessage = async (
	type,
	message,
	provider
) => {
	let signature;
	if (type === "solana") {
		const messageToSign = new TextEncoder().encode(message);
		let signatureEncoded = await provider.signMessage(messageToSign);
		signature = bs58.encode(signatureEncoded.signature);
	}
	return signature;
};