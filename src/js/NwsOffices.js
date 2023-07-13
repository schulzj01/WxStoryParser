/**
 * A grouping of NWS office metadata to map region to id
 * @author Jeremy.Schulz@noaa.gov
 *
 */

"use strict"

const wfoConfig = [
/** WESTERN REGION */
	{ id: 'boi',  region: 'wr', },
	{ id: 'byz',  region: 'wr', },
	{ id: 'eka',  region: 'wr', },
	{ id: 'fgz',  region: 'wr', },
	{ id: 'ggw',  region: 'wr', },
	{ id: 'hnx',  region: 'wr', },
	{ id: 'lkn',  region: 'wr', },
	{ id: 'tfx',  region: 'wr', },
	{ id: 'vef',  region: 'wr', },
	{ id: 'mfr',  region: 'wr', },
	{ id: 'mso',  region: 'wr', },
	{ id: 'mtr',  region: 'wr', },
	{ id: 'lox',  region: 'wr', },
	{ id: 'pdt',  region: 'wr', },
	{ id: 'pqr',  region: 'wr', },
	{ id: 'pih',  region: 'wr', },
	{ id: 'psr',  region: 'wr', },
	{ id: 'rev',  region: 'wr', },
	{ id: 'sto',  region: 'wr', },
	{ id: 'slc',  region: 'wr', },
	{ id: 'sgx',  region: 'wr', },
	{ id: 'sew',  region: 'wr', },
	{ id: 'otx',  region: 'wr', },
	{ id: 'twc',  region: 'wr', },
/** CENTRAL REGION */
	{ id: 'abr',  region: 'cr', },
	{ id: 'apx',  region: 'cr', },
	{ id: 'arx',  region: 'cr', },
	{ id: 'bis',  region: 'cr', },
	{ id: 'bou',  region: 'cr', },
	{ id: 'cys',  region: 'cr', },
	{ id: 'ddc',  region: 'cr', },
	{ id: 'dlh',  region: 'cr', },
	{ id: 'dmx',  region: 'cr', },
	{ id: 'dtx',  region: 'cr', },
	{ id: 'dvn',  region: 'cr', },
	{ id: 'eax',  region: 'cr', },
	{ id: 'fgf',  region: 'cr', },
	{ id: 'fsd',  region: 'cr', },
	{ id: 'gid',  region: 'cr', },
	{ id: 'gjt',  region: 'cr', },
	{ id: 'gld',  region: 'cr', },
	{ id: 'grb',  region: 'cr', },
	{ id: 'grr',  region: 'cr', },
	{ id: 'ict',  region: 'cr', },
	{ id: 'ilx',  region: 'cr', },
	{ id: 'ind',  region: 'cr', },
	{ id: 'iwx',  region: 'cr', },
	{ id: 'jkl',  region: 'cr', },
	{ id: 'lbf',  region: 'cr', },
	{ id: 'lmk',  region: 'cr', },
	{ id: 'lot',  region: 'cr', },
	{ id: 'lsx',  region: 'cr', },
	{ id: 'mkx',  region: 'cr', },
	{ id: 'mpx',  region: 'cr', },
	{ id: 'mqt',  region: 'cr', },
	{ id: 'oax',  region: 'cr', },
	{ id: 'pah',  region: 'cr', },
	{ id: 'pub',  region: 'cr', },
	{ id: 'riw',  region: 'cr', },
	{ id: 'sgf',  region: 'cr', },
	{ id: 'top',  region: 'cr', },
	{ id: 'unr',  region: 'cr', },
/** EASTERN REGION */
	{ id: 'akq',  region: 'er', },
	{ id: 'aly',  region: 'er', },
	{ id: 'bgm',  region: 'er', },
	{ id: 'box',  region: 'er', },
	{ id: 'btv',  region: 'er', },
	{ id: 'buf',  region: 'er', },
	{ id: 'cae',  region: 'er', },
	{ id: 'car',  region: 'er', },
	{ id: 'chs',  region: 'er', },
	{ id: 'cle',  region: 'er', },
	{ id: 'ctp',  region: 'er', },
	{ id: 'gsp',  region: 'er', },
	{ id: 'gyx',  region: 'er', },
	{ id: 'ilm',  region: 'er', },
	{ id: 'iln',  region: 'er', },
	{ id: 'lwx',  region: 'er', },
	{ id: 'mhx',  region: 'er', },
	{ id: 'okx',  region: 'er', },
	{ id: 'pbz',  region: 'er', },
	{ id: 'phi',  region: 'er', },
	{ id: 'rah',  region: 'er', },
	{ id: 'rlx',  region: 'er', },
	{ id: 'rnk',  region: 'er', },
/** SOUTHERN REGION **/
	{ id: 'abq',  region: 'sr', },
	{ id: 'ama',  region: 'sr', },
	{ id: 'ewx',  region: 'sr', },
	{ id: 'bmx',  region: 'sr', },
	{ id: 'bro',  region: 'sr', },
	{ id: 'crp',  region: 'sr', },
	{ id: 'fwd',  region: 'sr', },
	{ id: 'epz',  region: 'sr', },
	{ id: 'hgx',  region: 'sr', },
	{ id: 'hun',  region: 'sr', },
	{ id: 'jan',  region: 'sr', },
	{ id: 'jax',  region: 'sr', },
	{ id: 'key',  region: 'sr', },
	{ id: 'lch',  region: 'sr', },
	{ id: 'lzk',  region: 'sr', },
	{ id: 'lub',  region: 'sr', },
	{ id: 'mlb',  region: 'sr', },
	{ id: 'meg',  region: 'sr', },
	{ id: 'mfl',  region: 'sr', },
	{ id: 'maf',  region: 'sr', },
	{ id: 'mob',  region: 'sr', },
	{ id: 'mrx',  region: 'sr', },
	{ id: 'ohx',  region: 'sr', },
	{ id: 'ffc',  region: 'sr', },
	{ id: 'oun',  region: 'sr', },
	{ id: 'sjt',  region: 'sr', },
	{ id: 'sju',  region: 'sr', },
	{ id: 'shv',  region: 'sr', },
	{ id: 'tae',  region: 'sr', },
	{ id: 'tbw',  region: 'sr', },
	{ id: 'tsa',  region: 'sr', },
	/** ALASKA REGION */
	{ id: 'afc', region: 'ar', },
	{ id: 'afg', region: 'ar', },
	{ id: 'ajk', region: 'ar', },
	/** PACIFIC REGION */
	{ id: 'hfo', region: 'pr', },
	{ id: 'gum', region: 'pr', },
	{ id: 'ppg', region: 'pr', },

]

const rfcConfig = [
	{ id: 'cnrfc', region: 'wr', },
	{ id: 'cbrfc', region: 'wr', },
	{ id: 'nwrfc', region: 'wr', },
	{ id: 'mbrfc', region: 'cr', },
	{ id: 'ncrfc', region: 'cr', },
	{ id: 'nerfc', region: 'er', },
	{ id: 'marfc', region: 'er', },
	{ id: 'ohrfc', region: 'er', },
	{ id: 'aprfc', region: 'ar', },
	{ id: 'wgrfc', region: 'sr', },
	{ id: 'abrfc', region: 'sr', },
	{ id: 'lmrfc', region: 'sr', },
	{ id: 'serfc', region: 'sr', },
]

const cwsuConfig = [
	{ id: 'zla', region: 'wr', },
	{ id: 'zlc', region: 'wr', },
	{ id: 'zoa', region: 'wr', },
	{ id: 'zse', region: 'wr', },
	{ id: 'zau', region: 'cr', },
	{ id: 'zdv', region: 'cr', },
	{ id: 'zid', region: 'cr', },
	{ id: 'zkc', region: 'cr', },
	{ id: 'zmp', region: 'cr', },
	{ id: 'zbw', region: 'er', },
	{ id: 'zdc', region: 'er', },
	{ id: 'zny', region: 'er', },
	{ id: 'zob', region: 'er', },
	{ id: 'zfw', region: 'sr', },
	{ id: 'zhu', region: 'sr', },
	{ id: 'zme', region: 'sr', },
	{ id: 'ztl', region: 'sr', },
	{ id: 'zjx', region: 'sr', },
	{ id: 'zma', region: 'sr', },
	{ id: 'zan', region: 'ar', },
	{ id: 'zab', region: 'sr', },
]

/**
 * Shortcut function to combine all configurations together.
 * @returns {Object[]} - All office configurations in a single array.
 */
const combinedConfig = () => [...wfoConfig,...rfcConfig,...cwsuConfig];



/**
 * Gets metadata about an NWS office based on their site id.
 * @param {String} id - 3 character nws id.  Not sure if national centers have these at all so we may need to adjust using the term "id"
 */
export function getOfficeMetadata(id){
	let key = combinedConfig().find(elm => elm.id === id.toLowerCase())
	if (key) { return key; }
	else { return false; }
}
