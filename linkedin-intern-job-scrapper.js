const {
	LinkedinScraper,
	typeFilter,
	events,
} = require('linkedin-jobs-scraper');

(async () => {
	const scraper = new LinkedinScraper({
		headless: true,
		slowMo: 100, // used to be 10
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
			employmentType,
		}) => {
			res.table.push({
				query: query,
				location: location,
				title: title,
				company: company,
				place: place,
				date: date,
				link: link,
				employmentType: employmentType,
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
			'data/linkedin_intern_output.json',
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
					limit: 10,
					filters: {
						type: [typeFilter.INTERNSHIP],
					},
				},
			},
			{
				query: 'Backend Engineer',
				options: {
					locations: ['Bangladesh'],
					limit: 10,
					filters: {
						type: [typeFilter.INTERNSHIP],
					},
				},
			},
			{
				query: 'Software Engineer',
				options: {
					locations: ['Bangladesh'],
					limit: 10,
					filters: {
						type: [typeFilter.INTERNSHIP],
					},
				},
			},
			{
				query: 'Laravel Developer',
				options: {
					locations: ['Bangladesh'],
					limit: 10,
					filters: {
						type: [typeFilter.INTERNSHIP],
					},
				},
			},
			{
				query: 'React Developer',
				options: {
					locations: ['Bangladesh'],
					limit: 10,
					filters: {
						type: [typeFilter.INTERNSHIP],
					},
				},
			},
			{
				query: 'Flutter Developer',
				options: {
					locations: ['Bangladesh'],
					limit: 10,
					filters: {
						type: [typeFilter.INTERNSHIP],
					},
				},
			},
			{
				query: 'DevOps Engineer',
				options: {
					locations: ['Bangladesh'],
					limit: 10,
					filters: {
						type: [typeFilter.INTERNSHIP],
					},
				},
			},
			{
				query: 'Node Developer',
				options: {
					locations: ['Bangladesh'],
					limit: 10,
					filters: {
						type: [typeFilter.INTERNSHIP],
					},
				},
			},
		]),
	]);

	await scraper.close();
})();
