document.querySelector('.intro__text-subdonat').addEventListener('click', copyCardNum)

const options = {
	mobile: false,
	stepOfScroll: 1,
}

let detect = new MobileDetect(window.navigator.userAgent)


function copyCardNum(event) {
	if (event.target.classList.contains('card__num')) {
		if (event.target.innerText != 'номер скопірований!') {
			const target = event.target
			const text = target.innerText
			const range = document.createRange();
			range.selectNode(target);
			window.getSelection().removeAllRanges(); // clear current selection
			window.getSelection().addRange(range); // to select text
			window.navigator.clipboard.writeText(text);
			window.getSelection().removeAllRanges();// to deselect
			target.innerText = 'номер скопірований!'
			target.style.color = 'green'
			setTimeout(() => {
				target.style.color = '#212121'
				target.innerText = text
			}, 1000)
		}
	}
}

function optimizationForMobil() {
	if (detect.phone()) {
		options.mobile = true
		let $videoListArr = [...document.querySelectorAll('.video-block__item')]
		$videoListArr = $videoListArr.slice(1)
		displayVideo = $videoListArr
		$videoListArr.forEach((item, i) => {
			if (i > 2)
				item.remove()
		})
		window.addEventListener('scroll', lazyLoad);
	}
}

function lazyLoad() {
	if (options.mobile) {
		const position = scrollY
		console.log(position)
		if (position > 600 && options.stepOfScroll === 1) {
			createItem(videoList, 2, 6)
			options.stepOfScroll++
		} else if (position > 1200 && options.stepOfScroll === 2) {
			createItem(videoList, 5, 9)
			options.stepOfScroll++
		} else if (position > 1800 && options.stepOfScroll === 3) {
			createItem(videoList, 8, 12)
			options.stepOfScroll++
		} else if (position > 2400 && options.stepOfScroll === 4) {
			createItem(videoList, 11)
			options.stepOfScroll++
		}
	}
}
optimizationForMobil()

function createItem(list, start, end = videoList.length) {
	const parent = document.querySelector('.video-list__inner')
	list.forEach((item, i) => {
		if (i > start && i < end) {
			const blockItem = document.createElement('DIV')
			blockItem.classList.add('video-block__item')

			const divBG = document.createElement('DIV')
			divBG.classList.add('video-bg')
			blockItem.append(divBG)

			const divBGLoad = document.createElement('DIV')
			divBGLoad.classList.add('video-bg__load')
			blockItem.append(divBGLoad)

			const iframe = document.createElement('iframe')
			iframe.classList.add('video-block__item-video')
			iframe.setAttribute('title', "YouTube video player")
			iframe.setAttribute('frameborder', '0')
			iframe.setAttribute('allow', 'accelerometer')
			iframe.setAttribute('autoplay', 'autoplay')
			iframe.setAttribute('clipboard-write', 'clipboard-write')
			iframe.setAttribute('encrypted-media', 'encrypted-media')
			iframe.setAttribute('gyroscope', 'gyroscope')
			iframe.setAttribute('picture-in-picture', 'picture-in-picture')
			iframe.setAttribute('allowfullscreen', 'allowfullscreen')
			iframe.setAttribute('src', item.src)
			blockItem.append(iframe)
			parent.append(blockItem)
		}
	})
}