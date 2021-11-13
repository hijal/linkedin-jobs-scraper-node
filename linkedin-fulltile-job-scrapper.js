const {
	LinkedinScraper,
	typeFilter,
	events,
} = require('linkedin-jobs-scraper');

(async () => {
	const scraper = new LinkedinScraper({
		headless: true,
		slowMo: 500,
	});

	var res = {
		table: [],
	};

	scraper.on(
		events.scraper.data,
		({
			query,
			location,
			link,
			title,
			company,
			place,
			date,
			senorityLevel,
			jobFunction,
			employmentType,
			industries,
		}) => {
			res.table.push({
				query: query,
				location: location,
				title: title,
				company: company,
				place: place,
				date: date,
				link: link,
				senorityLevel: senorityLevel,
				function: jobFunction,
				employmentType: employmentType,
				industries: industries,
			});
		}
	);

	scraper.on(events.scraper.error, (err) => {
		console.error(err);
	});
	scraper.on(events.scraper.end, () => {
		let fs = require('fs');
		let time = '{"time" : ' + '"' + new Date().toLocaleString() + '",';
		let dir = './data';

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		fs.writeFile(
			'data/linkedin_fulltime_output.json',
			time + '"data" : ' + JSON.stringify(res.table) + '}',
			'utf8',
			() => {}
		);
	});

	scraper.on(events.puppeteer.browser.targetcreated, () => {});
	scraper.on(events.puppeteer.browser.targetchanged, () => {});
	scraper.on(events.puppeteer.browser.targetdestroyed, () => {});
	scraper.on(events.puppeteer.browser.disconnected, () => {});

	await Promise.all([
		scraper.run([
			{
				query: 'Frontend Engineer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Backend Engineer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Software Engineer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Laravel Developer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'React Developer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Flutter Developer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'DevOps Engineer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Node Developer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Lead Full Stack Developer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Full Stack Engineer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Senior Software Engineer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Sr. Backend Developer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Sr. Frontend Developer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
			{
				query: 'Lead Software Engineer',
				options: {
					locations: ['Bangladesh'],
					filters: {
						type: [typeFilter.FULL_TIME],
					},
				},
			},
		]),
	]);

	await scraper.close();
})();
