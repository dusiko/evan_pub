document.querySelector('.intro__text-subdonat').addEventListener('click', copyCardNum)

let detect = new MobileDetect(window.navigator.userAgent)

const options = {
	mobile: false,
	stepOfScroll: 1,
	videoListCount: document.querySelector('.video-list__inner').children.length,
}
optimizationForMobil()


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
			if (i > 1)
				item.remove()
		})
		const element = document.querySelector('.footer');
		window.addEventListener('scroll', () => footerInVisibleArea(element))
		footerInVisibleArea(element)
	}
}


function footerInVisibleArea(target) {

	// Все позиции элемента
	const targetPosition = {
		top: window.pageYOffset + target.getBoundingClientRect().top,
		left: window.pageXOffset + target.getBoundingClientRect().left,
		right: window.pageXOffset + target.getBoundingClientRect().right,
		bottom: window.pageYOffset + target.getBoundingClientRect().bottom
	},
		// Получаем позиции окна
		windowPosition = {
			top: window.pageYOffset,
			left: window.pageXOffset,
			right: window.pageXOffset + document.documentElement.clientWidth,
			bottom: window.pageYOffset + document.documentElement.clientHeight
		};

	if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
		targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
		targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
		targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
		// Если элемент полностью видно, то запускаем следующий код
		addMoreVideo()
	} else {
		// Если элемент не видно, то запускаем этот код
		// console.clear();
	};
}


// А также запустим функцию сразу. А то вдруг, элемент изначально видно


function addMoreVideo() {
	if (options.mobile) {
		if (options.stepOfScroll === 1) {
			createItem(videoList, 1, 4)
			options.stepOfScroll++
		} else if (options.stepOfScroll === 2) {
			createItem(videoList, 3, 6)
			options.stepOfScroll++
		} else if (options.stepOfScroll === 3) {
			createItem(videoList, 5, 8)
			options.stepOfScroll++
		} else if (options.stepOfScroll === 4) {
			createItem(videoList, 7, 10)
			options.stepOfScroll++
		} else if (options.stepOfScroll === 5) {
			createItem(videoList, 9, 12)
			options.stepOfScroll++
		} else if (options.stepOfScroll === 6) {
			createItem(videoList, 11, 14)
			options.stepOfScroll++
		} else if (options.stepOfScroll === 7) {
			createItem(videoList, 13, 16)
			options.stepOfScroll++
		} else if (options.stepOfScroll === 8) {
			createItem(videoList, 15)
			options.stepOfScroll++
		}
	}
}


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