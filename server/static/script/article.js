
document.querySelectorAll('.vote-elem').forEach(item => {
	item.addEventListener('click', (e) => {
		const tmpData    = e.currentTarget.dataset.id;
		const div        = e.currentTarget;
		const vote       = tmpData.split('_')[0];
		const article_id = tmpData.split('_')[1];
		const vote_status_elem =
		    div.closest('.vote').querySelector('.vote-status');
		const upvote_elem   = div.closest('.vote').querySelector('.upvote');
		const downvote_elem = div.closest('.vote').querySelector('.downvote');

		console.log(`article/id=${article_id}/${vote}`);
		fetch(`article/id=${article_id}/${vote}`, {method: 'POST'})
			.then(res => {
			    if (res.status != 200)
				    window.location.reload();
			    return res.json();
			})
			.then(res => {
			    const {user_vote, all_votes} = res;

			    if (user_vote == 1)
			    {
				    if (downvote_elem.classList.contains('my-after-vote'))
					    downvote_elem.classList.remove('my-after-vote');
				    upvote_elem.classList.add('my-after-vote');
			    }
			    else if (user_vote == -1)
			    {
				    if (upvote_elem.classList.contains('my-after-vote'))
					    upvote_elem.classList.remove('my-after-vote');
				    downvote_elem.classList.add('my-after-vote');
			    }
			    else
			    {
				    downvote_elem.classList.remove('my-after-vote');
				    upvote_elem.classList.remove('my-after-vote');
			    }
			    vote_status_elem.innerText = all_votes;
			    console.log(res);
			});
	});
});
