'use strict';
const fs = require('fs');
const path = require('path');
const coins = require('coinlist');
const getColors = require('get-svg-colors');
const manifest = require('../manifest.json');

const overrides = new Map([
	['VRSC', 'VerusCoin'],
	['GMR', 'Gimmer'],
	['NEXO', 'Nexo'],
	['GUSD', 'Gemini dollar'],
	['CALL', 'Capital'],
	['BOS', 'BOScoin'],
	['CIX', 'Cryptonetix'],
	['COQUI', 'COQUI Cash'],
	['DEEZ', 'DeezNuts'],
	['MZC', 'MAZA'],
	['CVC', 'Civic'],
	['BTM', 'Bitmark'],
	['GLXT', 'GLX Token'],
	['ONG', 'SoMee.Social'],
	['CC', 'CoinCollect'],
	['2GIVE', '2Give'],
	['BOOTY', 'Booty'],
	['PUNGO', 'Pungo Token'],
	['X', 'GLX Equity Token'],
	['AYWA', 'Aywa'],
	['CHAIN', 'Chainmakers'],
	['LPT', 'Livepeer Token'],
	['AUDR', 'AUDRamp'],
	['BAB', 'Bitcoin Cash ABC'],
	['BSV', 'BitcoinSV'],
	['GOLD', 'Dragonereum Gold'],
	['USDC', 'USD Coin'],
	['AEUR', 'Augmint Euro Token'],
	['BCIO', 'Blockchain.io'],
	['BEAM', 'Beam'],
	['BTT', 'BitTorrent'],
	['GRIN', 'Grin'],
	['ILK', 'Inlock Token'],
	['BTM', 'Bytom'],
	['D', 'Denarius'],
	['BTCD', 'BitcoinDark'],
	['CMT', 'Comet'],
	['CTR', 'Centra'],
	['HSR', 'HShare'],
	['ICN', 'Iconomi'],
	['IOST', 'IOStoken'],
	['PRL', 'Oyster'],
	['RCN', 'Rcoin'],
	['REN', 'Ren'],
	['RYO', 'Ryo Currency'],
	['SKY', 'Skycoin'],
	['XVC', 'Vcash'],
	['MATIC', 'Matic Network'],
	['AMPL', 'Ampleforth'],
	['DOT', 'Polkadot'],
	['KLOWN', 'Ether Clown'],
	['LEO', 'Unus Sed LEO'],
	['SAI', 'Single Collateral DAI'],
	['SIN', 'SINOVATE'],
	['YFI', 'yearn.finance'],
	['DAI', 'Dai'],
	['BAND', 'Band Protocol'],
	['BAL', 'Balancer'],
	['OMG', 'OMG Network'],
	['ARNX', 'Aeron'],
	['ALGO', 'Algorand'],
	['OXT', 'Orchid'],
	['REPV2', 'Augur'],
	['UNI', 'Uniswap'],
	['COMP', 'Compound'],
	['STOX', 'Stox'],
	['CRV', 'Curve DAO Token'],
	['SOL', 'Solana'],
	['GRT', 'The Graph'],
	['KSM', 'Kusama'],
	['STX', 'Stacks'],
	['SUSHI', 'SushiSwap'],
	['PAXG', 'PAX Gold'],
	['SAFEMOON', 'SafeMoon'],
	['SAND', 'The Sandbox'],
	['MAX', 'MAX Token'],
	['NTBC', 'Note Blockchain'],
	['FLUX', 'Flux'],
	['MATIC', 'Polygon'],
	['ONE', 'Harmony'],
	['ICP', 'Internet Computer'],
	['EMB', 'Emblem'],
	['HNS', 'Handshake'],
	['XPR', 'Proton'],
	['SKL', 'SKALE Network'],
	['SPACEHBIT', 'HashBit Blockchain'],
]);

const icons = manifest.map(icon => {
	const id = typeof icon === 'string' ? icon : icon.symbol;
	const filename = `${id.toLowerCase()}.svg`;
	const svgPath = path.resolve(__dirname, '../svg/color/', filename);
	const svg = fs.readFileSync(svgPath, 'utf8');
	
	// Try to extract fill color, fallback to existing color or default
	let color = '#627eea'; // Default blue fallback
	try {
		const colors = getColors(svg);
		if (colors.fills && colors.fills[0]) {
			color = colors.fills[0].hex().toLowerCase();
		} else if (typeof icon === 'object' && icon.color) {
			// Preserve existing color from manifest
			color = icon.color;
		}
	} catch (e) {
		// If color extraction fails, preserve existing or use default
		if (typeof icon === 'object' && icon.color) {
			color = icon.color;
		}
		console.warn(`Warning: Could not extract color for ${id}, using ${color}`);
	}

	return {
		symbol: id.toUpperCase(),
		name: overrides.get(id) || coins.get(id, 'name') || id,
		color
	};
});

icons.sort((a, b) => a.symbol.localeCompare(b.symbol));

const data = JSON.stringify(icons, null, '\t') + '\n';

fs.writeFileSync(path.resolve(__dirname, '../manifest.json'), data);
