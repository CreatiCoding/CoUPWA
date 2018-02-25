import React from 'react';
import $ from 'jquery';

const MainContents = ({weekAllToon}) => {

	/**
	 * 이미지 로딩되기 전에 보여줄 건 이렇게 배경으로 지정하면 됨.ㅇㅇㅇ
	 * img {
  background: url('loading.gif') no-repeat;
}
	 * @param data
	 */
	const errfunc = e => {
		e.target.src = '/images/thumbnail_default.png';
	};
	const onload = e => {
		let self = e.target;
		// $(self.parentNode.childNodes[0]).hide();
		$(self).show();
	};
	const mapToMainContentsWebtoon = data => {
		return data.map((ele, seq, arr) => {
			let src = "/images?path=0";
			let title;
			let rate;
			let update;
			let author;
			if(ele === "yet"){
				src = "0";
				title = "";
				rate = "";
				update = "";
				author = "";
			}else{
				src = "/images?path="+ele.path;
				title = ele.title;
				rate = ele.rate;
				update = ele.update;
				author = ele.author;
			}
			return (
				<div className="main-contents-toon col-4 col-sm-3 col-md-3 col-lg-2 col-xl-2" key={seq}>
					<div className="main-contents-toon-img">
						<img className="default_thumbnail" src={'/images/thumbnail_default.png'}/>
						<img className="main-contents-toon-thumbnail" onLoad={onload} onError={errfunc} src={src}/>
					</div>
					<div className="main-contents-toon-title">
						{title}
					</div>
					<div>
						<span className="main-contents-toon-rate">{rate}</span>
						<span className="main-contents-toon-update" style={{color: '#00FF00'}}>{(update)?'(UP)':''}</span>
					</div>
					<div className="main-contents-toon-author">{author}</div>
				</div>
			);
		});
	};
	const mapToSwiperSlideWebtoonList = data => {
		console.log(data);
		return data.map((ele, seq, arr) => {
			return (
				<div className="main-contents-swiper-slide swiper-slide" key={seq}>
					<div className="container-fluid" >
						<div className="row">{mapToMainContentsWebtoon(ele)}</div>
					</div>
				</div>
			);
		});
	};
	return (
		<div>
			<div className="main-contents-swiper-container swiper-container">
				<div className="main-contents-swiper-wrapper swiper-wrapper">
					{mapToSwiperSlideWebtoonList(weekAllToon)}
				</div>
			</div>
		</div>
	);
};

export default MainContents;
