import React from 'react';
import '../css/mainContents.css';
import axios from 'axios';

const MainContentsWebtoon = ({src}) => {
    return (
		<div className="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-1">
			<img crossOrigin="Anonymous" src={'/images/thumbnail/'+src.slice(src.lastIndexOf("/")+1) } />
		</div>);
};
const MainContents = ({}) => {
    const thumbs = [
        [
            'http://thumb.comic.naver.net/webtoon/183559/thumbnail/title_thumbnail_20160516123017_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/648419/thumbnail/thumbnail_IMAG10_1421195d-13be-4cde-bcf9-0c78d51c5ea3.jpg',
            'http://thumb.comic.naver.net/webtoon/602910/thumbnail/thumbnail_IMAG10_891ed7a1-66e9-4286-bcd5-61cb129b7367.jpg',
            'http://thumb.comic.naver.net/webtoon/654774/thumbnail/thumbnail_IMAG10_67d90335-2f08-43bf-8eca-a1fece421a9d.jpg',
            'http://thumb.comic.naver.net/webtoon/702422/thumbnail/thumbnail_IMAG10_8a7d3a98-291e-4fec-b399-7b8219c90854.jpg',
            'http://thumb.comic.naver.net/webtoon/697680/thumbnail/thumbnail_IMAG10_56fba87e-5e25-44d6-9cd7-b4c05e757a40.jpg',
            'http://thumb.comic.naver.net/webtoon/679519/thumbnail/title_thumbnail_20160601180804_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/597478/thumbnail/thumbnail_IMAG10_487d19d8-3547-43a0-aa94-10ef7fc94cda.jpg',
            'http://thumb.comic.naver.net/webtoon/703837/thumbnail/thumbnail_IMAG10_818effb7-d779-46e2-a7c8-0657131692cc.jpg',
            'http://thumb.comic.naver.net/webtoon/694807/thumbnail/thumbnail_IMAG10_49a1f978-53e4-4f40-8d66-42ee26d14cfc.jpg',
            'http://thumb.comic.naver.net/webtoon/702170/thumbnail/thumbnail_IMAG10_4f60dfb5-0d95-4fa4-a3cc-e64529011ef6.jpg',
            'http://thumb.comic.naver.net/webtoon/644180/thumbnail/title_thumbnail_20141231175152_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/698888/thumbnail/thumbnail_IMAG10_49e1ecf6-8b80-46e5-9ffc-45ed48a4fdd8.jpg',
            'http://thumb.comic.naver.net/webtoon/679568/thumbnail/title_thumbnail_20160729221220_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/694191/thumbnail/thumbnail_IMAG10_307f3104-80a0-4878-bf7a-6ffbf3fa263f.jpg',
            'http://thumb.comic.naver.net/webtoon/700139/thumbnail/thumbnail_IMAG10_34e13db4-712c-4556-9e32-5ecf17061293.jpg',
            'http://thumb.comic.naver.net/webtoon/703635/thumbnail/thumbnail_IMAG10_3ff49f08-1841-482b-9514-cfa14880b858.jpg',
            'http://thumb.comic.naver.net/webtoon/703629/thumbnail/thumbnail_IMAG10_7e5a9139-264f-4243-aeef-649ee5058433.jpg',
            'http://thumb.comic.naver.net/webtoon/700858/thumbnail/thumbnail_IMAG10_a01d69ed-7018-4f26-8c9e-e081b66037eb.jpg',
            'http://thumb.comic.naver.net/webtoon/21815/thumbnail/thumbnail_title_21815_83x90.gif',
            'http://thumb.comic.naver.net/webtoon/316911/thumbnail/title_thumbnail_20160708114201_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/668723/thumbnail/thumbnail_IMAG10_7d4eefd4-c96e-4e85-acdb-c65dac816c46.jpg',
            'http://thumb.comic.naver.net/webtoon/687915/thumbnail/thumbnail_IMAG10_e03acc4a-a1ce-4ebc-a021-e3cc07af5f20.jpg',
            'http://thumb.comic.naver.net/webtoon/703838/thumbnail/thumbnail_IMAG10_e473ae37-18af-44f6-83ee-a0d63e153cdb.jpg',
            'http://thumb.comic.naver.net/webtoon/658076/thumbnail/thumbnail_IMAG10_6633fd6e-e82c-4e3b-ae89-b732b10a0d62.jpg',
            'http://thumb.comic.naver.net/webtoon/675554/thumbnail/title_thumbnail_20160303181701_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/703840/thumbnail/thumbnail_IMAG10_6491af9f-a7b8-4894-bc2a-c082d1f5970b.jpg',
            'http://thumb.comic.naver.net/webtoon/698247/thumbnail/thumbnail_IMAG10_f6c073ec-8740-4a3f-915e-61f55cc0b3d6.jpg',
            'http://thumb.comic.naver.net/webtoon/706083/thumbnail/thumbnail_IMAG10_ca431bb9-49f6-46fa-b7eb-259c811a54a5.jpg',
        ],

        [
            'http://thumb.comic.naver.net/webtoon/20853/thumbnail/thumbnail_title_20853_83x90.gif',
            'http://thumb.comic.naver.net/webtoon/25455/thumbnail/title_thumbnail_20100614120245_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/675331/thumbnail/title_thumbnail_20160229184941_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/655744/thumbnail/title_thumbnail_20150601184016_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/703307/thumbnail/thumbnail_IMAG10_0c6ab332-3b2b-4d18-bc97-b512c038087a.jpg',
            'http://thumb.comic.naver.net/webtoon/698918/thumbnail/thumbnail_IMAG10_1ffbcabb-b5fd-41d8-9500-faaee1d3cbb4.jpg',
            'http://thumb.comic.naver.net/webtoon/702608/thumbnail/thumbnail_IMAG10_18186c48-4c35-4d98-9821-9eb03c9cd590.jpg',
            'http://thumb.comic.naver.net/webtoon/683496/thumbnail/title_thumbnail_20160805110206_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/119874/thumbnail/title_thumbnail_20150706185233_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/695321/thumbnail/thumbnail_IMAG10_ed636544-e826-4b9b-96f2-fce37c9f8e54.jpg',
            'http://thumb.comic.naver.net/webtoon/682637/thumbnail/title_thumbnail_20160729190602_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/602287/thumbnail/thumbnail_IMAG10_9c263219-ce76-4050-8af8-0f3c1853a36d.jpg',
            'http://thumb.comic.naver.net/webtoon/644180/thumbnail/title_thumbnail_20141231175152_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/616239/thumbnail/title_thumbnail_20161031214436_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/702672/thumbnail/thumbnail_IMAG10_55cf206b-5c11-409e-a498-1ef4f3f8449b.jpg',
            'http://thumb.comic.naver.net/webtoon/400739/thumbnail/title_thumbnail_20150504175746_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/666670/thumbnail/title_thumbnail_20151109202307_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/676695/thumbnail/title_thumbnail_20160323171611_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/686669/thumbnail/title_thumbnail_20161014154832_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/675554/thumbnail/title_thumbnail_20160303181701_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/702165/thumbnail/thumbnail_IMAG10_68f82b34-0039-440a-a731-0f44ad25f942.jpg',
            'http://thumb.comic.naver.net/webtoon/700361/thumbnail/thumbnail_IMAG10_abf5987c-f842-47bc-9d0a-ab618987093d.jpg',
            'http://thumb.comic.naver.net/webtoon/626906/thumbnail/title_thumbnail_20150810235651_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/653344/thumbnail/title_thumbnail_20150420212358_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/686312/thumbnail/title_thumbnail_20161010182406_t83x90.jpg',
        ],
        [
            'http://thumb.comic.naver.net/webtoon/626907/thumbnail/title_thumbnail_20150407141027_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/662774/thumbnail/thumbnail_IMAG10_fddc4c8b-fbe6-422c-9777-590d98f4dc9e.jpg',
            'http://thumb.comic.naver.net/webtoon/651673/thumbnail/thumbnail_IMAG10_3c7a2e4c-376e-4856-9f03-6ba554dcd62a.jpg',
            'http://thumb.comic.naver.net/webtoon/667573/thumbnail/title_thumbnail_20151120112903_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/670143/thumbnail/title_thumbnail_20160108202909_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/703308/thumbnail/thumbnail_IMAG10_33415f77-8f6d-4a14-aec9-fcaa74e20a8a.jpg',
            'http://thumb.comic.naver.net/webtoon/703307/thumbnail/thumbnail_IMAG10_0c6ab332-3b2b-4d18-bc97-b512c038087a.jpg',
            'http://thumb.comic.naver.net/webtoon/702423/thumbnail/thumbnail_IMAG10_cccbd125-1d5a-4384-abdd-3191837e9ed7.jpg',
            'http://thumb.comic.naver.net/webtoon/701535/thumbnail/thumbnail_IMAG10_fbf4c573-a426-4e0c-80e8-620286e58986.jpg',
            'http://thumb.comic.naver.net/webtoon/694131/thumbnail/thumbnail_IMAG10_ccaed3e0-d0ef-4336-9615-03bfbf8ba038.jpg',
            'http://thumb.comic.naver.net/webtoon/703628/thumbnail/thumbnail_IMAG10_eed4a3ca-783c-4bac-baaf-08ac5c3fab74.jpg',
            'http://thumb.comic.naver.net/webtoon/642598/thumbnail/title_thumbnail_20160117000448_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/449854/thumbnail/title_thumbnail_20120302192957_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/697533/thumbnail/thumbnail_IMAG10_d8ba91a4-6234-4699-a44e-34d03b5c5429.jpg',
            'http://thumb.comic.naver.net/webtoon/671421/thumbnail/thumbnail_IMAG10_b0f7d54d-f2f8-4b8e-a521-f8dd96ff65f1.jpg',
            'http://thumb.comic.naver.net/webtoon/644180/thumbnail/title_thumbnail_20141231175152_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/694806/thumbnail/thumbnail_IMAG10_ba63efc6-09c0-4e75-9f7c-e5ac61d24c53.jpg',
            'http://thumb.comic.naver.net/webtoon/703633/thumbnail/thumbnail_IMAG10_bb71f1fd-2777-4406-b107-505257fec051.jpg',
            'http://thumb.comic.naver.net/webtoon/703835/thumbnail/thumbnail_IMAG10_2415a124-c69d-4c47-9116-0ce099298f2c.jpg',
            'http://thumb.comic.naver.net/webtoon/316909/thumbnail/thumbnail_IMAG10_da706b81-7dc2-456f-a047-0a67c0c48ab7.jpg',
            'http://thumb.comic.naver.net/webtoon/703845/thumbnail/thumbnail_IMAG10_5093aeaa-f9c9-48bb-86e1-ad45c073216d.jpg',
            'http://thumb.comic.naver.net/webtoon/681453/thumbnail/thumbnail_IMAG10_864695b9-5f82-4f13-9702-57890ecb3f21.jpg',
            'http://thumb.comic.naver.net/webtoon/675554/thumbnail/title_thumbnail_20160303181701_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/169080/thumbnail/title_thumbnail_20140731163812_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/635174/thumbnail/title_thumbnail_20161108161056_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/602916/thumbnail/thumbnail_IMAG10_2669be3e-94eb-465e-8c03-b769dd08a490.jpg',
            'http://thumb.comic.naver.net/webtoon/697254/thumbnail/thumbnail_IMAG10_d9682b94-f3dd-44be-a3e5-2de5a867ed88.jpg',
        ],
        [
            'http://thumb.comic.naver.net/webtoon/697685/thumbnail/thumbnail_IMAG10_f8d868ff-0505-498c-ac37-d11a7f952496.jpg',
            'http://thumb.comic.naver.net/webtoon/570503/thumbnail/thumbnail_IMAG10_5719a3fe-81f4-4a0c-8c27-eca1631e8384.jpg',
            'http://thumb.comic.naver.net/webtoon/557672/thumbnail/title_thumbnail_20130508182053_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/679519/thumbnail/title_thumbnail_20160601180804_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/570506/thumbnail/title_thumbnail_20130710192300_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/703837/thumbnail/thumbnail_IMAG10_818effb7-d779-46e2-a7c8-0657131692cc.jpg',
            'http://thumb.comic.naver.net/webtoon/699659/thumbnail/thumbnail_IMAG10_63f587f6-3f4e-409e-a83a-d3caf039d167.jpg',
            'http://thumb.comic.naver.net/webtoon/131385/thumbnail/thumbnail_IMAG10_c5053bcc-3b95-473d-bfe1-e4256bf56b58.jpg',
            'http://thumb.comic.naver.net/webtoon/704595/thumbnail/thumbnail_IMAG10_fc5132c6-092a-4188-9b78-e60ab13b4c68.jpg',
            'http://thumb.comic.naver.net/webtoon/637931/thumbnail/thumbnail_IMAG10_064f190a-2f70-4149-b9af-760bfdede057.jpg',
            'http://thumb.comic.naver.net/webtoon/703836/thumbnail/thumbnail_IMAG10_9a45ab7a-8135-41be-8c81-85e713043f90.jpg',
            'http://thumb.comic.naver.net/webtoon/699415/thumbnail/thumbnail_IMAG10_b309bb62-635c-4356-99ed-d27f0a554592.jpg',
            'http://thumb.comic.naver.net/webtoon/24965/thumbnail/title_thumbnail_20141127002232_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/670144/thumbnail/title_thumbnail_20151230192753_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/701700/thumbnail/thumbnail_IMAG10_356f4c5a-804a-4417-b60d-810e555d4359.jpg',
            'http://thumb.comic.naver.net/webtoon/644180/thumbnail/title_thumbnail_20141231175152_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/693431/thumbnail/thumbnail_IMAG10_6fd984c4-c6d7-4fa6-b19b-010b2ff5b143.jpg',
            'http://thumb.comic.naver.net/webtoon/693444/thumbnail/thumbnail_IMAG10_35e3e217-ec81-4f9c-9bb6-36c2bc956b68.jpg',
            'http://thumb.comic.naver.net/webtoon/646358/thumbnail/title_thumbnail_20150120174956_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/687921/thumbnail/title_thumbnail_20161109000040_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/579352/thumbnail/title_thumbnail_20130806193438_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/657948/thumbnail/title_thumbnail_20150701000805_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/703629/thumbnail/thumbnail_IMAG10_7e5a9139-264f-4243-aeef-649ee5058433.jpg',
            'http://thumb.comic.naver.net/webtoon/694805/thumbnail/thumbnail_IMAG10_a3ea91c4-4bc8-45b0-b24e-4f1dde0dd7e9.jpg',
            'http://thumb.comic.naver.net/webtoon/670145/thumbnail/title_thumbnail_20160105121235_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/160469/thumbnail/title_thumbnail_20100616174201_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/675554/thumbnail/title_thumbnail_20160303181701_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/690594/thumbnail/title_thumbnail_20170103224105_t83x90.jpg',
        ],
        [
            'http://thumb.comic.naver.net/webtoon/641253/thumbnail/title_thumbnail_20141120112141_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/318995/thumbnail/title_thumbnail_20110407182655_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/697679/thumbnail/thumbnail_IMAG10_8e80b682-2f76-4189-8889-f2b575f2bebf.jpg',
            'http://thumb.comic.naver.net/webtoon/701081/thumbnail/thumbnail_IMAG10_7120be5e-b5c7-4727-aba5-cb500c6098ab.jpg',
            'http://thumb.comic.naver.net/webtoon/675393/thumbnail/title_thumbnail_20160303164424_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/552960/thumbnail/title_thumbnail_20130905153649_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/651664/thumbnail/title_thumbnail_20150326153630_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/119874/thumbnail/title_thumbnail_20150706185233_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/668101/thumbnail/title_thumbnail_20151203204442_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/700844/thumbnail/thumbnail_IMAG10_7511a21d-75f1-4ac8-9d24-df2e89f535b2.jpg',
            'http://thumb.comic.naver.net/webtoon/678499/thumbnail/title_thumbnail_20160503224849_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/644180/thumbnail/title_thumbnail_20141231175152_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/679543/thumbnail/title_thumbnail_20160602111920_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/670149/thumbnail/title_thumbnail_20160114113016_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/696602/thumbnail/thumbnail_IMAG10_38a8b067-ae10-46c9-b5e3-233c0cef7a4d.jpg',
            'http://thumb.comic.naver.net/webtoon/685460/thumbnail/title_thumbnail_20161013114305_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/644112/thumbnail/title_thumbnail_20150105174647_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/578108/thumbnail/title_thumbnail_20140127223051_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/696617/thumbnail/thumbnail_IMAG10_211651ba-ceb9-4093-9cdc-2ca234fa7f8f.jpg',
            'http://thumb.comic.naver.net/webtoon/654333/thumbnail/title_thumbnail_20160908173314_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/693429/thumbnail/thumbnail_IMAG10_b49f3f9f-9388-4fc2-b421-6f11f7a18494.jpg',
            'http://thumb.comic.naver.net/webtoon/675554/thumbnail/title_thumbnail_20160303181701_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/169080/thumbnail/title_thumbnail_20140731163812_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/705414/thumbnail/thumbnail_IMAG10_a8deaefb-132f-4f85-b6b0-cda6b6c81407.jpg',
            'http://thumb.comic.naver.net/webtoon/622643/thumbnail/title_thumbnail_20160719191308_t83x90.jpg',
        ],
        [
            'http://thumb.comic.naver.net/webtoon/568986/thumbnail/thumbnail_IMAG10_a83d67d4-a409-42f2-9451-01bc2a0666af.jpg',
            'http://thumb.comic.naver.net/webtoon/597447/thumbnail/title_thumbnail_20131102162055_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/650305/thumbnail/title_thumbnail_20161209212128_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/651673/thumbnail/thumbnail_IMAG10_3c7a2e4c-376e-4856-9f03-6ba554dcd62a.jpg',
            'http://thumb.comic.naver.net/webtoon/670139/thumbnail/title_thumbnail_20160805231945_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/679567/thumbnail/title_thumbnail_20160610142303_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/642700/thumbnail/title_thumbnail_20141219235553_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/677737/thumbnail/title_thumbnail_20160415184239_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/670150/thumbnail/title_thumbnail_20160122200146_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/703630/thumbnail/thumbnail_IMAG10_1000e0d2-b7d7-4d59-ba1e-74d8c3644882.jpg',
            'http://thumb.comic.naver.net/webtoon/704595/thumbnail/thumbnail_IMAG10_fc5132c6-092a-4188-9b78-e60ab13b4c68.jpg',
            'http://thumb.comic.naver.net/webtoon/697654/thumbnail/thumbnail_IMAG10_af52ba47-e038-4fbb-a94d-70a09666bd58.jpg',
            'http://thumb.comic.naver.net/webtoon/682637/thumbnail/title_thumbnail_20160729190602_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/622644/thumbnail/title_thumbnail_20150127152059_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/703631/thumbnail/thumbnail_IMAG10_a08e8d07-ab88-4eaa-90e5-1085c606f4ee.jpg',
            'http://thumb.comic.naver.net/webtoon/644180/thumbnail/title_thumbnail_20141231175152_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/679570/thumbnail/title_thumbnail_20160617142441_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/670151/thumbnail/title_thumbnail_20160808182525_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/64997/thumbnail/title_thumbnail_20110515001535_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/616239/thumbnail/title_thumbnail_20161031214436_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/702672/thumbnail/thumbnail_IMAG10_55cf206b-5c11-409e-a498-1ef4f3f8449b.jpg',
            'http://thumb.comic.naver.net/webtoon/700843/thumbnail/thumbnail_IMAG10_14880dfd-bb04-4b6e-a71e-20328751b164.jpg',
            'http://thumb.comic.naver.net/webtoon/703839/thumbnail/thumbnail_IMAG10_0fdef946-12e1-4591-a5eb-fbf05783fc97.jpg',
            'http://thumb.comic.naver.net/webtoon/524520/thumbnail/title_thumbnail_20161007190526_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/686669/thumbnail/title_thumbnail_20161014154832_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/664406/thumbnail/title_thumbnail_20151005150636_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/705328/thumbnail/thumbnail_IMAG10_bbe95df8-1860-41b5-b03b-12bd4bc2cf21.jpg',
        ],
        [
            'http://thumb.comic.naver.net/webtoon/697656/thumbnail/thumbnail_IMAG10_7d08e994-e6e9-437f-9001-e3cd28892a8a.jpg',
            'http://thumb.comic.naver.net/webtoon/654809/thumbnail/title_thumbnail_20150806141807_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/670152/thumbnail/title_thumbnail_20160122210643_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/703307/thumbnail/thumbnail_IMAG10_0c6ab332-3b2b-4d18-bc97-b512c038087a.jpg',
            'http://thumb.comic.naver.net/webtoon/557676/thumbnail/thumbnail_IMAG10_e44c2148-c07b-4ccb-b53a-1fee1c6e2122.jpg',
            'http://thumb.comic.naver.net/webtoon/651617/thumbnail/thumbnail_IMAG10_6e112c5d-a48f-4eca-9e0f-b8f8fb048346.jpg',
            'http://thumb.comic.naver.net/webtoon/119874/thumbnail/title_thumbnail_20150706185233_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/684435/thumbnail/title_thumbnail_20160820210349_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/698469/thumbnail/thumbnail_IMAG10_890975d8-f226-4e26-87b2-a002af9c9ebf.jpg',
            'http://thumb.comic.naver.net/webtoon/699658/thumbnail/thumbnail_IMAG10_7a3fecc7-6bcf-4fcd-b1cb-101e8b480480.jpg',
            'http://thumb.comic.naver.net/webtoon/655746/thumbnail/thumbnail_IMAG10_0a5175a6-514f-47f8-8d70-6d3893d396c0.jpg',
            'http://thumb.comic.naver.net/webtoon/642598/thumbnail/title_thumbnail_20160117000448_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/374974/thumbnail/title_thumbnail_20140829190825_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/644180/thumbnail/title_thumbnail_20141231175152_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/703841/thumbnail/thumbnail_IMAG10_f6a90bdf-571f-43d7-a9a6-efb4d23b165a.jpg',
            'http://thumb.comic.naver.net/webtoon/675823/thumbnail/thumbnail_IMAG10_cc947103-4732-4895-aa93-3ffc1b51566c.jpg',
            'http://thumb.comic.naver.net/webtoon/695585/thumbnail/thumbnail_IMAG10_07775b75-eb10-4c7c-8bc8-948ca2c2b6fb.jpg',
            'http://thumb.comic.naver.net/webtoon/660366/thumbnail/thumbnail_IMAG10_153d8d39-9168-4359-917c-03c325a48f58.jpg',
            'http://thumb.comic.naver.net/webtoon/690503/thumbnail/title_thumbnail_20170106153614_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/22897/thumbnail/thumbnail_title_22897_83x90.gif',
            'http://thumb.comic.naver.net/webtoon/697537/thumbnail/thumbnail_IMAG10_b3568141-bbd3-4bd2-85fd-7996263ad332.jpg',
            'http://thumb.comic.naver.net/webtoon/703835/thumbnail/thumbnail_IMAG10_2415a124-c69d-4c47-9116-0ce099298f2c.jpg',
            'http://thumb.comic.naver.net/webtoon/703848/thumbnail/thumbnail_IMAG10_1d2ad4ac-5bec-41c2-9b4d-36469fefd666.jpg',
            'http://thumb.comic.naver.net/webtoon/695796/thumbnail/thumbnail_IMAG10_715d2406-1940-48ad-9ca5-fb84693769b6.jpg',
            'http://thumb.comic.naver.net/webtoon/665170/thumbnail/title_thumbnail_20151016184500_t83x90.jpg',
            'http://thumb.comic.naver.net/webtoon/697535/thumbnail/thumbnail_IMAG10_18d07ed4-3a67-4e36-8406-c7d78f7aa163.jpg',
            'http://thumb.comic.naver.net/webtoon/626906/thumbnail/title_thumbnail_20150810235651_t83x90.jpg',
        ],
    ];
    const mapToMainContentsWebtoon = data => {
        return data.map((src, i) => {
            return <MainContentsWebtoon src={src} key={i}/>;
        });
    };
    return (
        <div>
            <div className="main-contents-swiper-container swiper-container">
                <div className="main-contents-swiper-wrapper swiper-wrapper">
                    <div className="main-contents-swiper-slide swiper-slide">
						<div className="container-fluid" >
							<div className="row">{mapToMainContentsWebtoon(thumbs[0])}</div>
						</div>
					</div>
					<div className="main-contents-swiper-slide swiper-slide">
						<div className="container-fluid" >
							<div className="row">{mapToMainContentsWebtoon(thumbs[1])}</div>
						</div>
					</div>
					<div className="main-contents-swiper-slide swiper-slide">
						<div className="container-fluid" >
							<div className="row">{mapToMainContentsWebtoon(thumbs[2])}</div>
						</div>
					</div>
					<div className="main-contents-swiper-slide swiper-slide">
						<div className="container-fluid" >
							<div className="row">{mapToMainContentsWebtoon(thumbs[3])}</div>
						</div>
					</div>
					<div className="main-contents-swiper-slide swiper-slide">
						<div className="container-fluid" >
							<div className="row">{mapToMainContentsWebtoon(thumbs[4])}</div>
						</div>
					</div>
					<div className="main-contents-swiper-slide swiper-slide">
						<div className="container-fluid" >
							<div className="row">{mapToMainContentsWebtoon(thumbs[5])}</div>
						</div>
					</div>
					<div className="main-contents-swiper-slide swiper-slide">
						<div className="container-fluid" >
							<div className="row">{mapToMainContentsWebtoon(thumbs[6])}</div>
						</div>
					</div>
                </div>
            </div>
        </div>
    );
};

export default MainContents;
