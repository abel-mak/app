
function getDays(ms)
{
	const dayMs = 86400000;
	const d     = Math.floor(ms / dayMs);

	if (d == 1)
		return '1 day';
	else if (d > 1)
		return `${d} days`;
	return '';
}

function getHours(ms)
{
	const hourMs = 3600000;
	const dayMs  = 86400000;
	const h      = Math.floor((ms % dayMs) / hourMs);

	if (h == 1)
		return '1 hour';
	else if (h > 1)
		return `${h} hour`;
	return '';
}

function getMinutes(ms)
{
	const hourMs = 3600000;
	const dayMs  = 86400000;
	const minMs  = 60000;
	const m      = Math.floor(((ms % dayMs) % hourMs) / minMs);

	if (m == 1)
		return '1 minute';
	else if (m > 1)
		return `${m} minutes`;
	return '';
}

function displayElapsed(ms)
{
	if (getDays(ms))
		return getDays(ms);
	else if (getHours(ms))
		return getHours(ms);
	else if (getMinutes(ms))
		return getMinutes(ms);
	else
		return '0 second';
}

window.onload = function() {
	document.querySelectorAll('.creation_time').forEach(function(item) {
		const ms        = parseInt(item.innerText);
		const curMs     = Date.parse(new Date());
		const elapsedMs = curMs - ms;

		console.log(elapsedMs);
		item.style.display = 'block';
		item.innerText     = displayElapsed(elapsedMs) + ' ago';
	});
};
