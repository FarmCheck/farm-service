export class District {
    public name: string;
    public code: string;
    public provincecode: string;
}

export class Province {
    public name: string;
    public code: string;
    public region: number;
}

export class Ward {
    public name: string;
    public code: string;
    public provincecode: string;
    public districtcode: string;
}

export enum location {
    North = 1,
    Middle,
    South,
}

export const Provinces: Province[] = [
    {
        code: '01',
        region: location.North,
        name: 'Thành phố Hà Nội',
    },
    {
        code: '02',
        region: location.North,
        name: 'Tỉnh Hà Giang',
    },
    {
        code: '04',
        region: location.North,
        name: 'Tỉnh Cao Bằng',
    },
    {
        code: '06',
        region: location.North,
        name: 'Tỉnh Bắc Kạn',
    },
    {
        code: '08',
        region: location.North,
        name: 'Tỉnh Tuyên Quang',
    },
    {
        code: '10',
        region: location.North,
        name: 'Tỉnh Lào Cai',
    },
    {
        code: '11',
        region: location.North,
        name: 'Tỉnh Điện Biên',
    },
    {
        code: '12',
        region: location.North,
        name: 'Tỉnh Lai Châu',
    },
    {
        code: '14',
        region: location.North,
        name: 'Tỉnh Sơn La',
    },
    {
        code: '15',
        region: location.North,
        name: 'Tỉnh Yên Bái',
    },
    {
        code: '17',
        region: location.North,
        name: 'Tỉnh Hoà Bình',
    },
    {
        code: '19',
        region: location.North,
        name: 'Tỉnh Thái Nguyên',
    },
    {
        code: '20',
        region: location.North,
        name: 'Tỉnh Lạng Sơn',
    },
    {
        code: '22',
        region: location.North,
        name: 'Tỉnh Quảng Ninh',
    },
    {
        code: '24',
        region: location.North,
        name: 'Tỉnh Bắc Giang',
    },
    {
        code: '25',
        region: location.North,
        name: 'Tỉnh Phú Thọ',
    },
    {
        code: '26',
        region: location.North,
        name: 'Tỉnh Vĩnh Phúc',
    },
    {
        code: '27',
        region: location.North,
        name: 'Tỉnh Bắc Ninh',
    },
    {
        code: '30',
        region: location.North,
        name: 'Tỉnh Hải Dương',
    },
    {
        code: '31',
        region: location.North,
        name: 'Thành phố Hải Phòng',
    },
    {
        code: '33',
        region: location.North,
        name: 'Tỉnh Hưng Yên',
    },
    {
        code: '34',
        region: location.North,
        name: 'Tỉnh Thái Bình',
    },
    {
        code: '35',
        region: location.North,
        name: 'Tỉnh Hà Nam',
    },
    {
        code: '36',
        region: location.North,
        name: 'Tỉnh Nam Định',
    },
    {
        code: '37',
        region: location.North,
        name: 'Tỉnh Ninh Bình',
    },
    {
        code: '38',
        region: location.Middle,
        name: 'Tỉnh Thanh Hóa',
    },
    {
        code: '40',
        region: location.Middle,
        name: 'Tỉnh Nghệ An',
    },
    {
        code: '42',
        region: location.Middle,
        name: 'Tỉnh Hà Tĩnh',
    },
    {
        code: '44',
        region: location.Middle,
        name: 'Tỉnh Quảng Bình',
    },
    {
        code: '45',
        region: location.Middle,
        name: 'Tỉnh Quảng Trị',
    },
    {
        code: '46',
        region: location.Middle,
        name: 'Tỉnh Thừa Thiên Huế',
    },
    {
        code: '48',
        region: location.Middle,
        name: 'Thành phố Đà Nẵng',
    },
    {
        code: '49',
        region: location.Middle,
        name: 'Tỉnh Quảng Nam',
    },
    {
        code: '51',
        region: location.Middle,
        name: 'Tỉnh Quảng Ngãi',
    },
    {
        code: '52',
        region: location.Middle,
        name: 'Tỉnh Bình Định',
    },
    {
        code: '54',
        region: location.Middle,
        name: 'Tỉnh Phú Yên',
    },
    {
        code: '56',
        region: location.Middle,
        name: 'Tỉnh Khánh Hòa',
    },
    {
        code: '62',
        region: location.Middle,
        name: 'Tỉnh Kon Tum',
    },
    {
        code: '64',
        region: location.Middle,
        name: 'Tỉnh Gia Lai',
    },
    {
        code: '66',
        region: location.Middle,
        name: 'Tỉnh Đắk Lắk',
    },
    {
        code: '67',
        region: location.Middle,
        name: 'Tỉnh Đắk Nông',
    },
    {
        code: '58',
        region: location.Middle,
        name: 'Tỉnh Ninh Thuận',
    },
    {
        code: '60',
        region: location.Middle,
        name: 'Tỉnh Bình Thuận',
    },
    {
        code: '68',
        region: location.Middle,
        name: 'Tỉnh Lâm Đồng',
    },
    {
        code: '70',
        region: location.South,
        name: 'Tỉnh Bình Phước',
    },
    {
        code: '72',
        region: location.South,
        name: 'Tỉnh Tây Ninh',
    },
    {
        code: '74',
        region: location.South,
        name: 'Tỉnh Bình Dương',
    },
    {
        code: '75',
        region: location.South,
        name: 'Tỉnh Đồng Nai',
    },
    {
        code: '77',
        region: location.South,
        name: 'Tỉnh Bà Rịa - Vũng Tàu',
    },
    {
        code: '79',
        region: location.South,
        name: 'Thành phố Hồ Chí Minh',
    },
    {
        code: '80',
        region: location.South,
        name: 'Tỉnh Long An',
    },
    {
        code: '82',
        region: location.South,
        name: 'Tỉnh Tiền Giang',
    },
    {
        code: '83',
        region: location.South,
        name: 'Tỉnh Bến Tre',
    },
    {
        code: '84',
        region: location.South,
        name: 'Tỉnh Trà Vinh',
    },
    {
        code: '86',
        region: location.South,
        name: 'Tỉnh Vĩnh Long',
    },
    {
        code: '87',
        region: location.South,
        name: 'Tỉnh Đồng Tháp',
    },
    {
        code: '89',
        region: location.South,
        name: 'Tỉnh An Giang',
    },
    {
        code: '91',
        region: location.South,
        name: 'Tỉnh Kiên Giang',
    },
    {
        code: '92',
        region: location.South,
        name: 'Thành phố Cần Thơ',
    },
    {
        code: '93',
        region: location.South,
        name: 'Tỉnh Hậu Giang',
    },
    {
        code: '94',
        region: location.South,
        name: 'Tỉnh Sóc Trăng',
    },
    {
        code: '95',
        region: location.South,
        name: 'Tỉnh Bạc Liêu',
    },
    {
        code: '96',
        region: location.South,
        name: 'Tỉnh Cà Mau',
    },
];

export const Districts: District[] = [
    {
        code: '100',
        provincecode: '11',
        name: 'Huyện Điện Biên',
    },
    {
        code: '101',
        provincecode: '11',
        name: 'Huyện Điện Biên Đông',
    },
    {
        code: '102',
        provincecode: '11',
        name: 'Huyện Mường Ảng',
    },
    {
        code: '103',
        provincecode: '11',
        name: 'Huyện Nậm Pồ',
    },
    {
        code: '105',
        provincecode: '12',
        name: 'Thành phố Lai Châu',
    },
    {
        code: '106',
        provincecode: '12',
        name: 'Huyện Tam Đường',
    },
    {
        code: '107',
        provincecode: '12',
        name: 'Huyện Mường Tè',
    },
    {
        code: '108',
        provincecode: '12',
        name: 'Huyện Sìn Hồ',
    },
    {
        code: '109',
        provincecode: '12',
        name: 'Huyện Phong Thổ',
    },
    {
        code: '110',
        provincecode: '12',
        name: 'Huyện Than Uyên',
    },
    {
        code: '111',
        provincecode: '12',
        name: 'Huyện Tân Uyên',
    },
    {
        code: '112',
        provincecode: '12',
        name: 'Huyện Nậm Nhùn',
    },
    {
        code: '116',
        provincecode: '14',
        name: 'Thành phố Sơn La',
    },
    {
        code: '118',
        provincecode: '14',
        name: 'Huyện Quỳnh Nhai',
    },
    {
        code: '119',
        provincecode: '14',
        name: 'Huyện Thuận Châu',
    },
    {
        code: '120',
        provincecode: '14',
        name: 'Huyện Mường La',
    },
    {
        code: '121',
        provincecode: '14',
        name: 'Huyện Bắc Yên',
    },
    {
        code: '122',
        provincecode: '14',
        name: 'Huyện Phù Yên',
    },
    {
        code: '123',
        provincecode: '14',
        name: 'Huyện Mộc Châu',
    },
    {
        code: '124',
        provincecode: '14',
        name: 'Huyện Yên Châu',
    },
    {
        code: '125',
        provincecode: '14',
        name: 'Huyện Mai Sơn',
    },
    {
        code: '126',
        provincecode: '14',
        name: 'Huyện Sông Mã',
    },
    {
        code: '127',
        provincecode: '14',
        name: 'Huyện Sốp Cộp',
    },
    {
        code: '128',
        provincecode: '14',
        name: 'Huyện Vân Hồ',
    },
    {
        code: '132',
        provincecode: '15',
        name: 'Thành phố Yên Bái',
    },
    {
        code: '133',
        provincecode: '15',
        name: 'Thị xã Nghĩa Lộ',
    },
    {
        code: '135',
        provincecode: '15',
        name: 'Huyện Lục Yên',
    },
    {
        code: '136',
        provincecode: '15',
        name: 'Huyện Văn Yên',
    },
    {
        code: '137',
        provincecode: '15',
        name: 'Huyện Mù Căng Chải',
    },
    {
        code: '138',
        provincecode: '15',
        name: 'Huyện Trấn Yên',
    },
    {
        code: '139',
        provincecode: '15',
        name: 'Huyện Trạm Tấu',
    },
    {
        code: '140',
        provincecode: '15',
        name: 'Huyện Văn Chấn',
    },
    {
        code: '141',
        provincecode: '15',
        name: 'Huyện Yên Bình',
    },
    {
        code: '148',
        provincecode: '17',
        name: 'Thành phố Hòa Bình',
    },
    {
        code: '150',
        provincecode: '17',
        name: 'Huyện Đà Bắc',
    },
    {
        code: '151',
        provincecode: '17',
        name: 'Huyện Kỳ Sơn',
    },
    {
        code: '152',
        provincecode: '17',
        name: 'Huyện Lương Sơn',
    },
    {
        code: '153',
        provincecode: '17',
        name: 'Huyện Kim Bôi',
    },
    {
        code: '154',
        provincecode: '17',
        name: 'Huyện Cao Phong',
    },
    {
        code: '155',
        provincecode: '17',
        name: 'Huyện Tân Lạc',
    },
    {
        code: '156',
        provincecode: '17',
        name: 'Huyện Mai Châu',
    },
    {
        code: '157',
        provincecode: '17',
        name: 'Huyện Lạc Sơn',
    },
    {
        code: '158',
        provincecode: '17',
        name: 'Huyện Yên Thủy',
    },
    {
        code: '159',
        provincecode: '17',
        name: 'Huyện Lạc Thủy',
    },
    {
        code: '164',
        provincecode: '19',
        name: 'Thành phố Thái Nguyên',
    },
    {
        code: '165',
        provincecode: '19',
        name: 'Thành phố Sông Công',
    },
    {
        code: '167',
        provincecode: '19',
        name: 'Huyện Định Hóa',
    },
    {
        code: '168',
        provincecode: '19',
        name: 'Huyện Phú Lương',
    },
    {
        code: '169',
        provincecode: '19',
        name: 'Huyện Đồng Hỷ',
    },
    {
        code: '170',
        provincecode: '19',
        name: 'Huyện Võ Nhai',
    },
    {
        code: '171',
        provincecode: '19',
        name: 'Huyện Đại Từ',
    },
    {
        code: '172',
        provincecode: '19',
        name: 'Thị xã Phổ Yên',
    },
    {
        code: '173',
        provincecode: '19',
        name: 'Huyện Phú Bình',
    },
    {
        code: '178',
        provincecode: '20',
        name: 'Thành phố Lạng Sơn',
    },
    {
        code: '180',
        provincecode: '20',
        name: 'Huyện Tràng Định',
    },
    {
        code: '181',
        provincecode: '20',
        name: 'Huyện Bình Gia',
    },
    {
        code: '182',
        provincecode: '20',
        name: 'Huyện Văn Lãng',
    },
    {
        code: '183',
        provincecode: '20',
        name: 'Huyện Cao Lộc',
    },
    {
        code: '184',
        provincecode: '20',
        name: 'Huyện Văn Quan',
    },
    {
        code: '185',
        provincecode: '20',
        name: 'Huyện Bắc Sơn',
    },
    {
        code: '186',
        provincecode: '20',
        name: 'Huyện Hữu Lũng',
    },
    {
        code: '187',
        provincecode: '20',
        name: 'Huyện Chi Lăng',
    },
    {
        code: '188',
        provincecode: '20',
        name: 'Huyện Lộc Bình',
    },
    {
        code: '189',
        provincecode: '20',
        name: 'Huyện Đình Lập',
    },
    {
        code: '193',
        provincecode: '22',
        name: 'Thành phố Hạ Long',
    },
    {
        code: '194',
        provincecode: '22',
        name: 'Thành phố Móng Cái',
    },
    {
        code: '195',
        provincecode: '22',
        name: 'Thành phố Cẩm Phả',
    },
    {
        code: '196',
        provincecode: '22',
        name: 'Thành phố Uông Bí',
    },
    {
        code: '198',
        provincecode: '22',
        name: 'Huyện Bình Liêu',
    },
    {
        code: '199',
        provincecode: '22',
        name: 'Huyện Tiên Yên',
    },
    {
        code: '200',
        provincecode: '22',
        name: 'Huyện Đầm Hà',
    },
    {
        code: '201',
        provincecode: '22',
        name: 'Huyện Hải Hà',
    },
    {
        code: '202',
        provincecode: '22',
        name: 'Huyện Ba Chẽ',
    },
    {
        code: '203',
        provincecode: '22',
        name: 'Huyện Vân Đồn',
    },
    {
        code: '204',
        provincecode: '22',
        name: 'Huyện Hoành Bồ',
    },
    {
        code: '205',
        provincecode: '22',
        name: 'Thị xã Đông Triều',
    },
    {
        code: '206',
        provincecode: '22',
        name: 'Thị xã Quảng Yên',
    },
    {
        code: '207',
        provincecode: '22',
        name: 'Huyện Cô Tô',
    },
    {
        code: '213',
        provincecode: '24',
        name: 'Thành phố Bắc Giang',
    },
    {
        code: '215',
        provincecode: '24',
        name: 'Huyện Yên Thế',
    },
    {
        code: '216',
        provincecode: '24',
        name: 'Huyện Tân Yên',
    },
    {
        code: '217',
        provincecode: '24',
        name: 'Huyện Lạng Giang',
    },
    {
        code: '218',
        provincecode: '24',
        name: 'Huyện Lục Nam',
    },
    {
        code: '219',
        provincecode: '24',
        name: 'Huyện Lục Ngạn',
    },
    {
        code: '220',
        provincecode: '24',
        name: 'Huyện Sơn Động',
    },
    {
        code: '221',
        provincecode: '24',
        name: 'Huyện Yên Dũng',
    },
    {
        code: '222',
        provincecode: '24',
        name: 'Huyện Việt Yên',
    },
    {
        code: '223',
        provincecode: '24',
        name: 'Huyện Hiệp Hòa',
    },
    {
        code: '227',
        provincecode: '25',
        name: 'Thành phố Việt Trì',
    },
    {
        code: '228',
        provincecode: '25',
        name: 'Thị xã Phú Thọ',
    },
    {
        code: '230',
        provincecode: '25',
        name: 'Huyện Đoan Hùng',
    },
    {
        code: '231',
        provincecode: '25',
        name: 'Huyện Hạ Hoà',
    },
    {
        code: '232',
        provincecode: '25',
        name: 'Huyện Thanh Ba',
    },
    {
        code: '233',
        provincecode: '25',
        name: 'Huyện Phù Ninh',
    },
    {
        code: '234',
        provincecode: '25',
        name: 'Huyện Yên Lập',
    },
    {
        code: '235',
        provincecode: '25',
        name: 'Huyện Cẩm Khê',
    },
    {
        code: '236',
        provincecode: '25',
        name: 'Huyện Tam Nông',
    },
    {
        code: '237',
        provincecode: '25',
        name: 'Huyện Lâm Thao',
    },
    {
        code: '238',
        provincecode: '25',
        name: 'Huyện Thanh Sơn',
    },
    {
        code: '239',
        provincecode: '25',
        name: 'Huyện Thanh Thuỷ',
    },
    {
        code: '240',
        provincecode: '25',
        name: 'Huyện Tân Sơn',
    },
    {
        code: '243',
        provincecode: '26',
        name: 'Thành phố Vĩnh Yên',
    },
    {
        code: '244',
        provincecode: '26',
        name: 'Thị xã Phúc Yên',
    },
    {
        code: '246',
        provincecode: '26',
        name: 'Huyện Lập Thạch',
    },
    {
        code: '247',
        provincecode: '26',
        name: 'Huyện Tam Dương',
    },
    {
        code: '248',
        provincecode: '26',
        name: 'Huyện Tam Đảo',
    },
    {
        code: '249',
        provincecode: '26',
        name: 'Huyện Bình Xuyên',
    },
    {
        code: '250',
        provincecode: '01',
        name: 'Huyện Mê Linh',
    },
    {
        code: '251',
        provincecode: '26',
        name: 'Huyện Yên Lạc',
    },
    {
        code: '252',
        provincecode: '26',
        name: 'Huyện Vĩnh Tường',
    },
    {
        code: '253',
        provincecode: '26',
        name: 'Huyện Sông Lô',
    },
    {
        code: '256',
        provincecode: '27',
        name: 'Thành phố Bắc Ninh',
    },
    {
        code: '258',
        provincecode: '27',
        name: 'Huyện Yên Phong',
    },
    {
        code: '260',
        provincecode: '27',
        name: 'Huyện Tiên Du',
    },
    {
        code: '261',
        provincecode: '27',
        name: 'Thị xã Từ Sơn',
    },
    {
        code: '262',
        provincecode: '27',
        name: 'Huyện Thuận Thành',
    },
    {
        code: '263',
        provincecode: '27',
        name: 'Huyện Gia Bình',
    },
    {
        code: '264',
        provincecode: '27',
        name: 'Huyện Lương Tài',
    },
    {
        code: '268',
        provincecode: '01',
        name: 'Quận Hà Đông',
    },
    {
        code: '269',
        provincecode: '01',
        name: 'Thị xã Sơn Tây',
    },
    {
        code: '271',
        provincecode: '01',
        name: 'Huyện Ba Vì',
    },
    {
        code: '272',
        provincecode: '01',
        name: 'Huyện Phúc Thọ',
    },
    {
        code: '273',
        provincecode: '01',
        name: 'Huyện Đan Phượng',
    },
    {
        code: '274',
        provincecode: '01',
        name: 'Huyện Hoài Đức',
    },
    {
        code: '275',
        provincecode: '01',
        name: 'Huyện Quốc Oai',
    },
    {
        code: '276',
        provincecode: '01',
        name: 'Huyện Thạch Thất',
    },
    {
        code: '277',
        provincecode: '01',
        name: 'Huyện Chương Mỹ',
    },
    {
        code: '278',
        provincecode: '01',
        name: 'Huyện Thanh Oai',
    },
    {
        code: '279',
        provincecode: '01',
        name: 'Huyện Thường Tín',
    },
    {
        code: '280',
        provincecode: '01',
        name: 'Huyện Phú Xuyên',
    },
    {
        code: '281',
        provincecode: '01',
        name: 'Huyện Ứng Hòa',
    },
    {
        code: '282',
        provincecode: '01',
        name: 'Huyện Mỹ Đức',
    },
    {
        code: '288',
        provincecode: '30',
        name: 'Thành phố Hải Dương',
    },
    {
        code: '290',
        provincecode: '30',
        name: 'Thị xã Chí Linh',
    },
    {
        code: '291',
        provincecode: '30',
        name: 'Huyện Nam Sách',
    },
    {
        code: '292',
        provincecode: '30',
        name: 'Huyện Kinh Môn',
    },
    {
        code: '293',
        provincecode: '30',
        name: 'Huyện Kim Thành',
    },
    {
        code: '294',
        provincecode: '30',
        name: 'Huyện Thanh Hà',
    },
    {
        code: '295',
        provincecode: '30',
        name: 'Huyện Cẩm Giàng',
    },
    {
        code: '296',
        provincecode: '30',
        name: 'Huyện Bình Giang',
    },
    {
        code: '297',
        provincecode: '30',
        name: 'Huyện Gia Lộc',
    },
    {
        code: '298',
        provincecode: '30',
        name: 'Huyện Tứ Kỳ',
    },
    {
        code: '299',
        provincecode: '30',
        name: 'Huyện Ninh Giang',
    },
    {
        code: '300',
        provincecode: '30',
        name: 'Huyện Thanh Miện',
    },
    {
        code: '303',
        provincecode: '31',
        name: 'Quận Hồng Bàng',
    },
    {
        code: '304',
        provincecode: '31',
        name: 'Quận Ngô Quyền',
    },
    {
        code: '305',
        provincecode: '31',
        name: 'Quận Lê Chân',
    },
    {
        code: '306',
        provincecode: '31',
        name: 'Quận Hải An',
    },
    {
        code: '307',
        provincecode: '31',
        name: 'Quận Kiến An',
    },
    {
        code: '308',
        provincecode: '31',
        name: 'Quận Đồ Sơn',
    },
    {
        code: '309',
        provincecode: '31',
        name: 'Quận Dương Kinh',
    },
    {
        code: '311',
        provincecode: '31',
        name: 'Huyện Thuỷ Nguyên',
    },
    {
        code: '312',
        provincecode: '31',
        name: 'Huyện An Dương',
    },
    {
        code: '313',
        provincecode: '31',
        name: 'Huyện An Lão',
    },
    {
        code: '314',
        provincecode: '31',
        name: 'Huyện Kiến Thuỵ',
    },
    {
        code: '315',
        provincecode: '31',
        name: 'Huyện Tiên Lãng',
    },
    {
        code: '316',
        provincecode: '31',
        name: 'Huyện Vĩnh Bảo',
    },
    {
        code: '317',
        provincecode: '31',
        name: 'Huyện Cát Hải',
    },
    {
        code: '323',
        provincecode: '33',
        name: 'Thành phố Hưng Yên',
    },
    {
        code: '325',
        provincecode: '33',
        name: 'Huyện Văn Lâm',
    },
    {
        code: '326',
        provincecode: '33',
        name: 'Huyện Văn Giang',
    },
    {
        code: '327',
        provincecode: '33',
        name: 'Huyện Yên Mỹ',
    },
    {
        code: '328',
        provincecode: '33',
        name: 'Huyện Mỹ Hào',
    },
    {
        code: '329',
        provincecode: '33',
        name: 'Huyện Ân Thi',
    },
    {
        code: '330',
        provincecode: '33',
        name: 'Huyện Khoái Châu',
    },
    {
        code: '331',
        provincecode: '33',
        name: 'Huyện Kim Động',
    },
    {
        code: '332',
        provincecode: '33',
        name: 'Huyện Tiên Lữ',
    },
    {
        code: '333',
        provincecode: '33',
        name: 'Huyện Phù Cừ',
    },
    {
        code: '336',
        provincecode: '34',
        name: 'Thành phố Thái Bình',
    },
    {
        code: '338',
        provincecode: '34',
        name: 'Huyện Quỳnh Phụ',
    },
    {
        code: '339',
        provincecode: '34',
        name: 'Huyện Hưng Hà',
    },
    {
        code: '340',
        provincecode: '34',
        name: 'Huyện Đông Hưng',
    },
    {
        code: '341',
        provincecode: '34',
        name: 'Huyện Thái Thụy',
    },
    {
        code: '342',
        provincecode: '34',
        name: 'Huyện Tiền Hải',
    },
    {
        code: '343',
        provincecode: '34',
        name: 'Huyện Kiến Xương',
    },
    {
        code: '344',
        provincecode: '34',
        name: 'Huyện Vũ Thư',
    },
    {
        code: '347',
        provincecode: '35',
        name: 'Thành phố Phủ Lý',
    },
    {
        code: '349',
        provincecode: '35',
        name: 'Huyện Duy Tiên',
    },
    {
        code: '350',
        provincecode: '35',
        name: 'Huyện Kim Bảng',
    },
    {
        code: '351',
        provincecode: '35',
        name: 'Huyện Thanh Liêm',
    },
    {
        code: '352',
        provincecode: '35',
        name: 'Huyện Bình Lục',
    },
    {
        code: '353',
        provincecode: '35',
        name: 'Huyện Lý Nhân',
    },
    {
        code: '356',
        provincecode: '36',
        name: 'Thành phố Nam Định',
    },
    {
        code: '358',
        provincecode: '36',
        name: 'Huyện Mỹ Lộc',
    },
    {
        code: '359',
        provincecode: '36',
        name: 'Huyện Vụ Bản',
    },
    {
        code: '360',
        provincecode: '36',
        name: 'Huyện Ý Yên',
    },
    {
        code: '361',
        provincecode: '36',
        name: 'Huyện Nghĩa Hưng',
    },
    {
        code: '362',
        provincecode: '36',
        name: 'Huyện Nam Trực',
    },
    {
        code: '363',
        provincecode: '36',
        name: 'Huyện Trực Ninh',
    },
    {
        code: '364',
        provincecode: '36',
        name: 'Huyện Xuân Trường',
    },
    {
        code: '365',
        provincecode: '36',
        name: 'Huyện Giao Thủy',
    },
    {
        code: '366',
        provincecode: '36',
        name: 'Huyện Hải Hậu',
    },
    {
        code: '369',
        provincecode: '37',
        name: 'Thành phố Ninh Bình',
    },
    {
        code: '370',
        provincecode: '37',
        name: 'Thành phố Tam Điệp',
    },
    {
        code: '372',
        provincecode: '37',
        name: 'Huyện Nho Quan',
    },
    {
        code: '373',
        provincecode: '37',
        name: 'Huyện Gia Viễn',
    },
    {
        code: '374',
        provincecode: '37',
        name: 'Huyện Hoa Lư',
    },
    {
        code: '375',
        provincecode: '37',
        name: 'Huyện Yên Khánh',
    },
    {
        code: '376',
        provincecode: '37',
        name: 'Huyện Kim Sơn',
    },
    {
        code: '377',
        provincecode: '37',
        name: 'Huyện Yên Mô',
    },
    {
        code: '380',
        provincecode: '38',
        name: 'Thành phố Thanh Hóa',
    },
    {
        code: '381',
        provincecode: '38',
        name: 'Thị xã Bỉm Sơn',
    },
    {
        code: '382',
        provincecode: '38',
        name: 'Thành phố Sầm Sơn',
    },
    {
        code: '384',
        provincecode: '38',
        name: 'Huyện Mường Lát',
    },
    {
        code: '385',
        provincecode: '38',
        name: 'Huyện Quan Hóa',
    },
    {
        code: '386',
        provincecode: '38',
        name: 'Huyện Bá Thước',
    },
    {
        code: '387',
        provincecode: '38',
        name: 'Huyện Quan Sơn',
    },
    {
        code: '388',
        provincecode: '38',
        name: 'Huyện Lang Chánh',
    },
    {
        code: '389',
        provincecode: '38',
        name: 'Huyện Ngọc Lặc',
    },
    {
        code: '390',
        provincecode: '38',
        name: 'Huyện Cẩm Thủy',
    },
    {
        code: '391',
        provincecode: '38',
        name: 'Huyện Thạch Thành',
    },
    {
        code: '392',
        provincecode: '38',
        name: 'Huyện Hà Trung',
    },
    {
        code: '393',
        provincecode: '38',
        name: 'Huyện Vĩnh Lộc',
    },
    {
        code: '394',
        provincecode: '38',
        name: 'Huyện Yên Định',
    },
    {
        code: '395',
        provincecode: '38',
        name: 'Huyện Thọ Xuân',
    },
    {
        code: '396',
        provincecode: '38',
        name: 'Huyện Thường Xuân',
    },
    {
        code: '397',
        provincecode: '38',
        name: 'Huyện Triệu Sơn',
    },
    {
        code: '398',
        provincecode: '38',
        name: 'Huyện Thiệu Hóa',
    },
    {
        code: '399',
        provincecode: '38',
        name: 'Huyện Hoằng Hóa',
    },
    {
        code: '400',
        provincecode: '38',
        name: 'Huyện Hậu Lộc',
    },
    {
        code: '401',
        provincecode: '38',
        name: 'Huyện Nga Sơn',
    },
    {
        code: '402',
        provincecode: '38',
        name: 'Huyện Như Xuân',
    },
    {
        code: '403',
        provincecode: '38',
        name: 'Huyện Như Thanh',
    },
    {
        code: '404',
        provincecode: '38',
        name: 'Huyện Nông Cống',
    },
    {
        code: '405',
        provincecode: '38',
        name: 'Huyện Đông Sơn',
    },
    {
        code: '406',
        provincecode: '38',
        name: 'Huyện Quảng Xương',
    },
    {
        code: '407',
        provincecode: '38',
        name: 'Huyện Tĩnh Gia',
    },
    {
        code: '412',
        provincecode: '40',
        name: 'Thành phố Vinh',
    },
    {
        code: '413',
        provincecode: '40',
        name: 'Thị xã Cửa Lò',
    },
    {
        code: '414',
        provincecode: '40',
        name: 'Thị xã Thái Hoà',
    },
    {
        code: '415',
        provincecode: '40',
        name: 'Huyện Quế Phong',
    },
    {
        code: '416',
        provincecode: '40',
        name: 'Huyện Quỳ Châu',
    },
    {
        code: '417',
        provincecode: '40',
        name: 'Huyện Kỳ Sơn',
    },
    {
        code: '418',
        provincecode: '40',
        name: 'Huyện Tương Dương',
    },
    {
        code: '419',
        provincecode: '40',
        name: 'Huyện Nghĩa Đàn',
    },
    {
        code: '420',
        provincecode: '40',
        name: 'Huyện Quỳ Hợp',
    },
    {
        code: '421',
        provincecode: '40',
        name: 'Huyện Quỳnh Lưu',
    },
    {
        code: '422',
        provincecode: '40',
        name: 'Huyện Con Cuông',
    },
    {
        code: '423',
        provincecode: '40',
        name: 'Huyện Tân Kỳ',
    },
    {
        code: '424',
        provincecode: '40',
        name: 'Huyện Anh Sơn',
    },
    {
        code: '425',
        provincecode: '40',
        name: 'Huyện Diễn Châu',
    },
    {
        code: '426',
        provincecode: '40',
        name: 'Huyện Yên Thành',
    },
    {
        code: '427',
        provincecode: '40',
        name: 'Huyện Đô Lương',
    },
    {
        code: '428',
        provincecode: '40',
        name: 'Huyện Thanh Chương',
    },
    {
        code: '429',
        provincecode: '40',
        name: 'Huyện Nghi Lộc',
    },
    {
        code: '430',
        provincecode: '40',
        name: 'Huyện Nam Đàn',
    },
    {
        code: '431',
        provincecode: '40',
        name: 'Huyện Hưng Nguyên',
    },
    {
        code: '432',
        provincecode: '40',
        name: 'Thị xã Hoàng Mai',
    },
    {
        code: '436',
        provincecode: '42',
        name: 'Thành phố Hà Tĩnh',
    },
    {
        code: '437',
        provincecode: '42',
        name: 'Thị xã Hồng Lĩnh',
    },
    {
        code: '439',
        provincecode: '42',
        name: 'Huyện Hương Sơn',
    },
    {
        code: '440',
        provincecode: '42',
        name: 'Huyện Đức Thọ',
    },
    {
        code: '441',
        provincecode: '42',
        name: 'Huyện Vũ Quang',
    },
    {
        code: '442',
        provincecode: '42',
        name: 'Huyện Nghi Xuân',
    },
    {
        code: '443',
        provincecode: '42',
        name: 'Huyện Can Lộc',
    },
    {
        code: '444',
        provincecode: '42',
        name: 'Huyện Hương Khê',
    },
    {
        code: '445',
        provincecode: '42',
        name: 'Huyện Thạch Hà',
    },
    {
        code: '446',
        provincecode: '42',
        name: 'Huyện Cẩm Xuyên',
    },
    {
        code: '447',
        provincecode: '42',
        name: 'Huyện Kỳ Anh',
    },
    {
        code: '448',
        provincecode: '42',
        name: 'Huyện Lộc Hà',
    },
    {
        code: '449',
        provincecode: '42',
        name: 'Thị xã Kỳ Anh',
    },
    {
        code: '450',
        provincecode: '44',
        name: 'Thành Phố Đồng Hới',
    },
    {
        code: '452',
        provincecode: '44',
        name: 'Huyện Minh Hóa',
    },
    {
        code: '453',
        provincecode: '44',
        name: 'Huyện Tuyên Hóa',
    },
    {
        code: '454',
        provincecode: '44',
        name: 'Huyện Quảng Trạch',
    },
    {
        code: '455',
        provincecode: '44',
        name: 'Huyện Bố Trạch',
    },
    {
        code: '456',
        provincecode: '44',
        name: 'Huyện Quảng Ninh',
    },
    {
        code: '457',
        provincecode: '44',
        name: 'Huyện Lệ Thủy',
    },
    {
        code: '458',
        provincecode: '44',
        name: 'Thị xã Ba Đồn',
    },
    {
        code: '461',
        provincecode: '45',
        name: 'Thành phố Đông Hà',
    },
    {
        code: '462',
        provincecode: '45',
        name: 'Thị xã Quảng Trị',
    },
    {
        code: '464',
        provincecode: '45',
        name: 'Huyện Vĩnh Linh',
    },
    {
        code: '465',
        provincecode: '45',
        name: 'Huyện Hướng Hóa',
    },
    {
        code: '466',
        provincecode: '45',
        name: 'Huyện Gio Linh',
    },
    {
        code: '467',
        provincecode: '45',
        name: 'Huyện Đa Krông',
    },
    {
        code: '468',
        provincecode: '45',
        name: 'Huyện Cam Lộ',
    },
    {
        code: '469',
        provincecode: '45',
        name: 'Huyện Triệu Phong',
    },
    {
        code: '470',
        provincecode: '45',
        name: 'Huyện Hải Lăng',
    },
    {
        code: '474',
        provincecode: '46',
        name: 'Thành phố Huế',
    },
    {
        code: '476',
        provincecode: '46',
        name: 'Huyện Phong Điền',
    },
    {
        code: '477',
        provincecode: '46',
        name: 'Huyện Quảng Điền',
    },
    {
        code: '478',
        provincecode: '46',
        name: 'Huyện Phú Vang',
    },
    {
        code: '479',
        provincecode: '46',
        name: 'Thị xã Hương Thủy',
    },
    {
        code: '480',
        provincecode: '46',
        name: 'Thị xã Hương Trà',
    },
    {
        code: '481',
        provincecode: '46',
        name: 'Huyện A Lưới',
    },
    {
        code: '482',
        provincecode: '46',
        name: 'Huyện Phú Lộc',
    },
    {
        code: '483',
        provincecode: '46',
        name: 'Huyện Nam Đông',
    },
    {
        code: '490',
        provincecode: '48',
        name: 'Quận Liên Chiểu',
    },
    {
        code: '491',
        provincecode: '48',
        name: 'Quận Thanh Khê',
    },
    {
        code: '492',
        provincecode: '48',
        name: 'Quận Hải Châu',
    },
    {
        code: '493',
        provincecode: '48',
        name: 'Quận Sơn Trà',
    },
    {
        code: '494',
        provincecode: '48',
        name: 'Quận Ngũ Hành Sơn',
    },
    {
        code: '495',
        provincecode: '48',
        name: 'Quận Cẩm Lệ',
    },
    {
        code: '497',
        provincecode: '48',
        name: 'Huyện Hòa Vang',
    },
    {
        code: '502',
        provincecode: '49',
        name: 'Thành phố Tam Kỳ',
    },
    {
        code: '503',
        provincecode: '49',
        name: 'Thành phố Hội An',
    },
    {
        code: '504',
        provincecode: '49',
        name: 'Huyện Tây Giang',
    },
    {
        code: '505',
        provincecode: '49',
        name: 'Huyện Đông Giang',
    },
    {
        code: '506',
        provincecode: '49',
        name: 'Huyện Đại Lộc',
    },
    {
        code: '507',
        provincecode: '49',
        name: 'Thị xã Điện Bàn',
    },
    {
        code: '508',
        provincecode: '49',
        name: 'Huyện Duy Xuyên',
    },
    {
        code: '509',
        provincecode: '49',
        name: 'Huyện Quế Sơn',
    },
    {
        code: '510',
        provincecode: '49',
        name: 'Huyện Nam Giang',
    },
    {
        code: '511',
        provincecode: '49',
        name: 'Huyện Phước Sơn',
    },
    {
        code: '512',
        provincecode: '49',
        name: 'Huyện Hiệp Đức',
    },
    {
        code: '513',
        provincecode: '49',
        name: 'Huyện Thăng Bình',
    },
    {
        code: '514',
        provincecode: '49',
        name: 'Huyện Tiên Phước',
    },
    {
        code: '515',
        provincecode: '49',
        name: 'Huyện Bắc Trà My',
    },
    {
        code: '516',
        provincecode: '49',
        name: 'Huyện Nam Trà My',
    },
    {
        code: '517',
        provincecode: '49',
        name: 'Huyện Núi Thành',
    },
    {
        code: '518',
        provincecode: '49',
        name: 'Huyện Phú Ninh',
    },
    {
        code: '519',
        provincecode: '49',
        name: 'Huyện Nông Sơn',
    },
    {
        code: '522',
        provincecode: '51',
        name: 'Thành phố Quảng Ngãi',
    },
    {
        code: '524',
        provincecode: '51',
        name: 'Huyện Bình Sơn',
    },
    {
        code: '525',
        provincecode: '51',
        name: 'Huyện Trà Bồng',
    },
    {
        code: '526',
        provincecode: '51',
        name: 'Huyện Tây Trà',
    },
    {
        code: '527',
        provincecode: '51',
        name: 'Huyện Sơn Tịnh',
    },
    {
        code: '528',
        provincecode: '51',
        name: 'Huyện Tư Nghĩa',
    },
    {
        code: '529',
        provincecode: '51',
        name: 'Huyện Sơn Hà',
    },
    {
        code: '530',
        provincecode: '51',
        name: 'Huyện Sơn Tây',
    },
    {
        code: '531',
        provincecode: '51',
        name: 'Huyện Minh Long',
    },
    {
        code: '532',
        provincecode: '51',
        name: 'Huyện Nghĩa Hành',
    },
    {
        code: '533',
        provincecode: '51',
        name: 'Huyện Mộ Đức',
    },
    {
        code: '534',
        provincecode: '51',
        name: 'Huyện Đức Phổ',
    },
    {
        code: '535',
        provincecode: '51',
        name: 'Huyện Ba Tơ',
    },
    {
        code: '536',
        provincecode: '51',
        name: 'Huyện Lý Sơn',
    },
    {
        code: '540',
        provincecode: '52',
        name: 'Thành phố Qui Nhơn',
    },
    {
        code: '542',
        provincecode: '52',
        name: 'Huyện An Lão',
    },
    {
        code: '543',
        provincecode: '52',
        name: 'Huyện Hoài Nhơn',
    },
    {
        code: '544',
        provincecode: '52',
        name: 'Huyện Hoài Ân',
    },
    {
        code: '545',
        provincecode: '52',
        name: 'Huyện Phù Mỹ',
    },
    {
        code: '546',
        provincecode: '52',
        name: 'Huyện Vĩnh Thạnh',
    },
    {
        code: '547',
        provincecode: '52',
        name: 'Huyện Tây Sơn',
    },
    {
        code: '548',
        provincecode: '52',
        name: 'Huyện Phù Cát',
    },
    {
        code: '549',
        provincecode: '52',
        name: 'Thị xã An Nhơn',
    },
    {
        code: '550',
        provincecode: '52',
        name: 'Huyện Tuy Phước',
    },
    {
        code: '551',
        provincecode: '52',
        name: 'Huyện Vân Canh',
    },
    {
        code: '555',
        provincecode: '54',
        name: 'Thành phố Tuy Hoà',
    },
    {
        code: '557',
        provincecode: '54',
        name: 'Thị xã Sông Cầu',
    },
    {
        code: '558',
        provincecode: '54',
        name: 'Huyện Đồng Xuân',
    },
    {
        code: '559',
        provincecode: '54',
        name: 'Huyện Tuy An',
    },
    {
        code: '560',
        provincecode: '54',
        name: 'Huyện Sơn Hòa',
    },
    {
        code: '561',
        provincecode: '54',
        name: 'Huyện Sông Hinh',
    },
    {
        code: '562',
        provincecode: '54',
        name: 'Huyện Tây Hoà',
    },
    {
        code: '563',
        provincecode: '54',
        name: 'Huyện Phú Hoà',
    },
    {
        code: '564',
        provincecode: '54',
        name: 'Huyện Đông Hòa',
    },
    {
        code: '568',
        provincecode: '56',
        name: 'Thành phố Nha Trang',
    },
    {
        code: '569',
        provincecode: '56',
        name: 'Thành phố Cam Ranh',
    },
    {
        code: '570',
        provincecode: '56',
        name: 'Huyện Cam Lâm',
    },
    {
        code: '571',
        provincecode: '56',
        name: 'Huyện Vạn Ninh',
    },
    {
        code: '572',
        provincecode: '56',
        name: 'Thị xã Ninh Hòa',
    },
    {
        code: '573',
        provincecode: '56',
        name: 'Huyện Khánh Vĩnh',
    },
    {
        code: '574',
        provincecode: '56',
        name: 'Huyện Diên Khánh',
    },
    {
        code: '575',
        provincecode: '56',
        name: 'Huyện Khánh Sơn',
    },
    {
        code: '576',
        provincecode: '56',
        name: 'Huyện Trường Sa',
    },
    {
        code: '582',
        provincecode: '58',
        name: 'Thành phố Phan Rang-Tháp Chàm',
    },
    {
        code: '584',
        provincecode: '58',
        name: 'Huyện Bác Ái',
    },
    {
        code: '585',
        provincecode: '58',
        name: 'Huyện Ninh Sơn',
    },
    {
        code: '586',
        provincecode: '58',
        name: 'Huyện Ninh Hải',
    },
    {
        code: '587',
        provincecode: '58',
        name: 'Huyện Ninh Phước',
    },
    {
        code: '588',
        provincecode: '58',
        name: 'Huyện Thuận Bắc',
    },
    {
        code: '589',
        provincecode: '58',
        name: 'Huyện Thuận Nam',
    },
    {
        code: '593',
        provincecode: '60',
        name: 'Thành phố Phan Thiết',
    },
    {
        code: '594',
        provincecode: '60',
        name: 'Thị xã La Gi',
    },
    {
        code: '595',
        provincecode: '60',
        name: 'Huyện Tuy Phong',
    },
    {
        code: '596',
        provincecode: '60',
        name: 'Huyện Bắc Bình',
    },
    {
        code: '597',
        provincecode: '60',
        name: 'Huyện Hàm Thuận Bắc',
    },
    {
        code: '598',
        provincecode: '60',
        name: 'Huyện Hàm Thuận Nam',
    },
    {
        code: '599',
        provincecode: '60',
        name: 'Huyện Tánh Linh',
    },
    {
        code: '600',
        provincecode: '60',
        name: 'Huyện Đức Linh',
    },
    {
        code: '601',
        provincecode: '60',
        name: 'Huyện Hàm Tân',
    },
    {
        code: '602',
        provincecode: '60',
        name: 'Huyện Phú Quí',
    },
    {
        code: '608',
        provincecode: '62',
        name: 'Thành phố Kon Tum',
    },
    {
        code: '610',
        provincecode: '62',
        name: 'Huyện Đắk Glei',
    },
    {
        code: '611',
        provincecode: '62',
        name: 'Huyện Ngọc Hồi',
    },
    {
        code: '612',
        provincecode: '62',
        name: 'Huyện Đắk Tô',
    },
    {
        code: '613',
        provincecode: '62',
        name: 'Huyện Kon Plông',
    },
    {
        code: '614',
        provincecode: '62',
        name: 'Huyện Kon Rẫy',
    },
    {
        code: '615',
        provincecode: '62',
        name: 'Huyện Đắk Hà',
    },
    {
        code: '616',
        provincecode: '62',
        name: 'Huyện Sa Thầy',
    },
    {
        code: '617',
        provincecode: '62',
        name: 'Huyện Tu Mơ Rông',
    },
    {
        code: '618',
        provincecode: '62',
        name: "Huyện Ia H' Drai",
    },
    {
        code: '622',
        provincecode: '64',
        name: 'Thành phố Pleiku',
    },
    {
        code: '623',
        provincecode: '64',
        name: 'Thị xã An Khê',
    },
    {
        code: '624',
        provincecode: '64',
        name: 'Thị xã Ayun Pa',
    },
    {
        code: '625',
        provincecode: '64',
        name: 'Huyện KBang',
    },
    {
        code: '626',
        provincecode: '64',
        name: 'Huyện Đăk Đoa',
    },
    {
        code: '627',
        provincecode: '64',
        name: 'Huyện Chư Păh',
    },
    {
        code: '628',
        provincecode: '64',
        name: 'Huyện Ia Grai',
    },
    {
        code: '629',
        provincecode: '64',
        name: 'Huyện Mang Yang',
    },
    {
        code: '630',
        provincecode: '64',
        name: 'Huyện Kông Chro',
    },
    {
        code: '631',
        provincecode: '64',
        name: 'Huyện Đức Cơ',
    },
    {
        code: '632',
        provincecode: '64',
        name: 'Huyện Chư Prông',
    },
    {
        code: '633',
        provincecode: '64',
        name: 'Huyện Chư Sê',
    },
    {
        code: '634',
        provincecode: '64',
        name: 'Huyện Đăk Pơ',
    },
    {
        code: '635',
        provincecode: '64',
        name: 'Huyện Ia Pa',
    },
    {
        code: '637',
        provincecode: '64',
        name: 'Huyện Krông Pa',
    },
    {
        code: '638',
        provincecode: '64',
        name: 'Huyện Phú Thiện',
    },
    {
        code: '639',
        provincecode: '64',
        name: 'Huyện Chư Pưh',
    },
    {
        code: '643',
        provincecode: '66',
        name: 'Thành phố Buôn Ma Thuột',
    },
    {
        code: '644',
        provincecode: '66',
        name: 'Thị Xã Buôn Hồ',
    },
    {
        code: '645',
        provincecode: '66',
        name: "Huyện Ea H'leo",
    },
    {
        code: '646',
        provincecode: '66',
        name: 'Huyện Ea Súp',
    },
    {
        code: '647',
        provincecode: '66',
        name: 'Huyện Buôn Đôn',
    },
    {
        code: '648',
        provincecode: '66',
        name: "Huyện Cư M'gar",
    },
    {
        code: '649',
        provincecode: '66',
        name: 'Huyện Krông Búk',
    },
    {
        code: '650',
        provincecode: '66',
        name: 'Huyện Krông Năng',
    },
    {
        code: '651',
        provincecode: '66',
        name: 'Huyện Ea Kar',
    },
    {
        code: '652',
        provincecode: '66',
        name: "Huyện M'Đrắk",
    },
    {
        code: '653',
        provincecode: '66',
        name: 'Huyện Krông Bông',
    },
    {
        code: '654',
        provincecode: '66',
        name: 'Huyện Krông Pắk',
    },
    {
        code: '655',
        provincecode: '66',
        name: 'Huyện Krông A Na',
    },
    {
        code: '656',
        provincecode: '66',
        name: 'Huyện Lắk',
    },
    {
        code: '657',
        provincecode: '66',
        name: 'Huyện Cư Kuin',
    },
    {
        code: '660',
        provincecode: '67',
        name: 'Thị xã Gia Nghĩa',
    },
    {
        code: '661',
        provincecode: '67',
        name: 'Huyện Đăk Glong',
    },
    {
        code: '662',
        provincecode: '67',
        name: 'Huyện Cư Jút',
    },
    {
        code: '663',
        provincecode: '67',
        name: 'Huyện Đắk Mil',
    },
    {
        code: '664',
        provincecode: '67',
        name: 'Huyện Krông Nô',
    },
    {
        code: '665',
        provincecode: '67',
        name: 'Huyện Đắk Song',
    },
    {
        code: '666',
        provincecode: '67',
        name: "Huyện Đắk R'Lấp",
    },
    {
        code: '667',
        provincecode: '67',
        name: 'Huyện Tuy Đức',
    },
    {
        code: '672',
        provincecode: '68',
        name: 'Thành phố Đà Lạt',
    },
    {
        code: '673',
        provincecode: '68',
        name: 'Thành phố Bảo Lộc',
    },
    {
        code: '674',
        provincecode: '68',
        name: 'Huyện Đam Rông',
    },
    {
        code: '675',
        provincecode: '68',
        name: 'Huyện Lạc Dương',
    },
    {
        code: '676',
        provincecode: '68',
        name: 'Huyện Lâm Hà',
    },
    {
        code: '677',
        provincecode: '68',
        name: 'Huyện Đơn Dương',
    },
    {
        code: '678',
        provincecode: '68',
        name: 'Huyện Đức Trọng',
    },
    {
        code: '679',
        provincecode: '68',
        name: 'Huyện Di Linh',
    },
    {
        code: '680',
        provincecode: '68',
        name: 'Huyện Bảo Lâm',
    },
    {
        code: '681',
        provincecode: '68',
        name: 'Huyện Đạ Huoai',
    },
    {
        code: '682',
        provincecode: '68',
        name: 'Huyện Đạ Tẻh',
    },
    {
        code: '683',
        provincecode: '68',
        name: 'Huyện Cát Tiên',
    },
    {
        code: '688',
        provincecode: '70',
        name: 'Thị xã Phước Long',
    },
    {
        code: '689',
        provincecode: '70',
        name: 'Thị xã Đồng Xoài',
    },
    {
        code: '690',
        provincecode: '70',
        name: 'Thị xã Bình Long',
    },
    {
        code: '691',
        provincecode: '70',
        name: 'Huyện Bù Gia Mập',
    },
    {
        code: '692',
        provincecode: '70',
        name: 'Huyện Lộc Ninh',
    },
    {
        code: '693',
        provincecode: '70',
        name: 'Huyện Bù Đốp',
    },
    {
        code: '694',
        provincecode: '70',
        name: 'Huyện Hớn Quản',
    },
    {
        code: '695',
        provincecode: '70',
        name: 'Huyện Đồng Phú',
    },
    {
        code: '696',
        provincecode: '70',
        name: 'Huyện Bù Đăng',
    },
    {
        code: '697',
        provincecode: '70',
        name: 'Huyện Chơn Thành',
    },
    {
        code: '698',
        provincecode: '70',
        name: 'Huyện Phú Riềng',
    },
    {
        code: '703',
        provincecode: '72',
        name: 'Thành phố Tây Ninh',
    },
    {
        code: '705',
        provincecode: '72',
        name: 'Huyện Tân Biên',
    },
    {
        code: '706',
        provincecode: '72',
        name: 'Huyện Tân Châu',
    },
    {
        code: '707',
        provincecode: '72',
        name: 'Huyện Dương Minh Châu',
    },
    {
        code: '708',
        provincecode: '72',
        name: 'Huyện Châu Thành',
    },
    {
        code: '709',
        provincecode: '72',
        name: 'Huyện Hòa Thành',
    },
    {
        code: '710',
        provincecode: '72',
        name: 'Huyện Gò Dầu',
    },
    {
        code: '711',
        provincecode: '72',
        name: 'Huyện Bến Cầu',
    },
    {
        code: '712',
        provincecode: '72',
        name: 'Huyện Trảng Bàng',
    },
    {
        code: '718',
        provincecode: '74',
        name: 'Thành phố Thủ Dầu Một',
    },
    {
        code: '719',
        provincecode: '74',
        name: 'Huyện Bàu Bàng',
    },
    {
        code: '720',
        provincecode: '74',
        name: 'Huyện Dầu Tiếng',
    },
    {
        code: '721',
        provincecode: '74',
        name: 'Thị xã Bến Cát',
    },
    {
        code: '722',
        provincecode: '74',
        name: 'Huyện Phú Giáo',
    },
    {
        code: '723',
        provincecode: '74',
        name: 'Thị xã Tân Uyên',
    },
    {
        code: '724',
        provincecode: '74',
        name: 'Thị xã Dĩ An',
    },
    {
        code: '725',
        provincecode: '74',
        name: 'Thị xã Thuận An',
    },
    {
        code: '726',
        provincecode: '74',
        name: 'Huyện Bắc Tân Uyên',
    },
    {
        code: '731',
        provincecode: '75',
        name: 'Thành phố Biên Hòa',
    },
    {
        code: '732',
        provincecode: '75',
        name: 'Thị xã Long Khánh',
    },
    {
        code: '734',
        provincecode: '75',
        name: 'Huyện Tân Phú',
    },
    {
        code: '735',
        provincecode: '75',
        name: 'Huyện Vĩnh Cửu',
    },
    {
        code: '736',
        provincecode: '75',
        name: 'Huyện Định Quán',
    },
    {
        code: '737',
        provincecode: '75',
        name: 'Huyện Trảng Bom',
    },
    {
        code: '738',
        provincecode: '75',
        name: 'Huyện Thống Nhất',
    },
    {
        code: '739',
        provincecode: '75',
        name: 'Huyện Cẩm Mỹ',
    },
    {
        code: '740',
        provincecode: '75',
        name: 'Huyện Long Thành',
    },
    {
        code: '741',
        provincecode: '75',
        name: 'Huyện Xuân Lộc',
    },
    {
        code: '742',
        provincecode: '75',
        name: 'Huyện Nhơn Trạch',
    },
    {
        code: '747',
        provincecode: '77',
        name: 'Thành phố Vũng Tàu',
    },
    {
        code: '748',
        provincecode: '77',
        name: 'Thành phố Bà Rịa',
    },
    {
        code: '750',
        provincecode: '77',
        name: 'Huyện Châu Đức',
    },
    {
        code: '751',
        provincecode: '77',
        name: 'Huyện Xuyên Mộc',
    },
    {
        code: '752',
        provincecode: '77',
        name: 'Huyện Long Điền',
    },
    {
        code: '753',
        provincecode: '77',
        name: 'Huyện Đất Đỏ',
    },
    {
        code: '760',
        provincecode: '79',
        name: 'Quận 1',
    },
    {
        code: '761',
        provincecode: '79',
        name: 'Quận 12',
    },
    {
        code: '762',
        provincecode: '79',
        name: 'Quận Thủ Đức',
    },
    {
        code: '763',
        provincecode: '79',
        name: 'Quận 9',
    },
    {
        code: '764',
        provincecode: '79',
        name: 'Quận Gò Vấp',
    },
    {
        code: '765',
        provincecode: '79',
        name: 'Quận Bình Thạnh',
    },
    {
        code: '766',
        provincecode: '79',
        name: 'Quận Tân Bình',
    },
    {
        code: '767',
        provincecode: '79',
        name: 'Quận Tân Phú',
    },
    {
        code: '768',
        provincecode: '79',
        name: 'Quận Phú Nhuận',
    },
    {
        code: '769',
        provincecode: '79',
        name: 'Quận 2',
    },
    {
        code: '770',
        provincecode: '79',
        name: 'Quận 3',
    },
    {
        code: '771',
        provincecode: '79',
        name: 'Quận 10',
    },
    {
        code: '772',
        provincecode: '79',
        name: 'Quận 11',
    },
    {
        code: '773',
        provincecode: '79',
        name: 'Quận 4',
    },
    {
        code: '774',
        provincecode: '79',
        name: 'Quận 5',
    },
    {
        code: '775',
        provincecode: '79',
        name: 'Quận 6',
    },
    {
        code: '776',
        provincecode: '79',
        name: 'Quận 8',
    },
    {
        code: '777',
        provincecode: '79',
        name: 'Quận Bình Tân',
    },
    {
        code: '778',
        provincecode: '79',
        name: 'Quận 7',
    },
    {
        code: '783',
        provincecode: '79',
        name: 'Huyện Củ Chi',
    },
    {
        code: '784',
        provincecode: '79',
        name: 'Huyện Hóc Môn',
    },
    {
        code: '785',
        provincecode: '79',
        name: 'Huyện Bình Chánh',
    },
    {
        code: '786',
        provincecode: '79',
        name: 'Huyện Nhà Bè',
    },
    {
        code: '787',
        provincecode: '79',
        name: 'Huyện Cần Giờ',
    },
    {
        code: '794',
        provincecode: '80',
        name: 'Thành phố Tân An',
    },
    {
        code: '795',
        provincecode: '80',
        name: 'Thị xã Kiến Tường',
    },
    {
        code: '796',
        provincecode: '80',
        name: 'Huyện Tân Hưng',
    },
    {
        code: '797',
        provincecode: '80',
        name: 'Huyện Vĩnh Hưng',
    },
    {
        code: '798',
        provincecode: '80',
        name: 'Huyện Mộc Hóa',
    },
    {
        code: '799',
        provincecode: '80',
        name: 'Huyện Tân Thạnh',
    },
    {
        code: '800',
        provincecode: '80',
        name: 'Huyện Thạnh Hóa',
    },
    {
        code: '801',
        provincecode: '80',
        name: 'Huyện Đức Huệ',
    },
    {
        code: '802',
        provincecode: '80',
        name: 'Huyện Đức Hòa',
    },
    {
        code: '803',
        provincecode: '80',
        name: 'Huyện Bến Lức',
    },
    {
        code: '804',
        provincecode: '80',
        name: 'Huyện Thủ Thừa',
    },
    {
        code: '805',
        provincecode: '80',
        name: 'Huyện Tân Trụ',
    },
    {
        code: '806',
        provincecode: '80',
        name: 'Huyện Cần Đước',
    },
    {
        code: '807',
        provincecode: '80',
        name: 'Huyện Cần Giuộc',
    },
    {
        code: '808',
        provincecode: '80',
        name: 'Huyện Châu Thành',
    },
    {
        code: '815',
        provincecode: '82',
        name: 'Thành phố Mỹ Tho',
    },
    {
        code: '816',
        provincecode: '82',
        name: 'Thị xã Gò Công',
    },
    {
        code: '817',
        provincecode: '82',
        name: 'Thị xã Cai Lậy',
    },
    {
        code: '818',
        provincecode: '82',
        name: 'Huyện Tân Phước',
    },
    {
        code: '819',
        provincecode: '82',
        name: 'Huyện Cái Bè',
    },
    {
        code: '820',
        provincecode: '82',
        name: 'Huyện Cai Lậy',
    },
    {
        code: '821',
        provincecode: '82',
        name: 'Huyện Châu Thành',
    },
    {
        code: '822',
        provincecode: '82',
        name: 'Huyện Chợ Gạo',
    },
    {
        code: '823',
        provincecode: '82',
        name: 'Huyện Gò Công Tây',
    },
    {
        code: '824',
        provincecode: '82',
        name: 'Huyện Gò Công Đông',
    },
    {
        code: '825',
        provincecode: '82',
        name: 'Huyện Tân Phú Đông',
    },
    {
        code: '829',
        provincecode: '83',
        name: 'Thành phố Bến Tre',
    },
    {
        code: '831',
        provincecode: '83',
        name: 'Huyện Châu Thành',
    },
    {
        code: '832',
        provincecode: '83',
        name: 'Huyện Chợ Lách',
    },
    {
        code: '833',
        provincecode: '83',
        name: 'Huyện Mỏ Cày Nam',
    },
    {
        code: '834',
        provincecode: '83',
        name: 'Huyện Giồng Trôm',
    },
    {
        code: '835',
        provincecode: '83',
        name: 'Huyện Bình Đại',
    },
    {
        code: '836',
        provincecode: '83',
        name: 'Huyện Ba Tri',
    },
    {
        code: '837',
        provincecode: '83',
        name: 'Huyện Thạnh Phú',
    },
    {
        code: '838',
        provincecode: '83',
        name: 'Huyện Mỏ Cày Bắc',
    },
    {
        code: '842',
        provincecode: '84',
        name: 'Thành phố Trà Vinh',
    },
    {
        code: '844',
        provincecode: '84',
        name: 'Huyện Càng Long',
    },
    {
        code: '845',
        provincecode: '84',
        name: 'Huyện Cầu Kè',
    },
    {
        code: '846',
        provincecode: '84',
        name: 'Huyện Tiểu Cần',
    },
    {
        code: '847',
        provincecode: '84',
        name: 'Huyện Châu Thành',
    },
    {
        code: '848',
        provincecode: '84',
        name: 'Huyện Cầu Ngang',
    },
    {
        code: '849',
        provincecode: '84',
        name: 'Huyện Trà Cú',
    },
    {
        code: '850',
        provincecode: '84',
        name: 'Huyện Duyên Hải',
    },
    {
        code: '851',
        provincecode: '84',
        name: 'Thị xã Duyên Hải',
    },
    {
        code: '855',
        provincecode: '86',
        name: 'Thành phố Vĩnh Long',
    },
    {
        code: '857',
        provincecode: '86',
        name: 'Huyện Long Hồ',
    },
    {
        code: '858',
        provincecode: '86',
        name: 'Huyện Mang Thít',
    },
    {
        code: '859',
        provincecode: '86',
        name: 'Huyện Vũng Liêm',
    },
    {
        code: '860',
        provincecode: '86',
        name: 'Huyện Tam Bình',
    },
    {
        code: '861',
        provincecode: '86',
        name: 'Thị xã Bình Minh',
    },
    {
        code: '862',
        provincecode: '86',
        name: 'Huyện Trà Ôn',
    },
    {
        code: '863',
        provincecode: '86',
        name: 'Huyện Bình Tân',
    },
    {
        code: '866',
        provincecode: '87',
        name: 'Thành phố Cao Lãnh',
    },
    {
        code: '867',
        provincecode: '87',
        name: 'Thành phố Sa Đéc',
    },
    {
        code: '868',
        provincecode: '87',
        name: 'Thị xã Hồng Ngự',
    },
    {
        code: '869',
        provincecode: '87',
        name: 'Huyện Tân Hồng',
    },
    {
        code: '870',
        provincecode: '87',
        name: 'Huyện Hồng Ngự',
    },
    {
        code: '871',
        provincecode: '87',
        name: 'Huyện Tam Nông',
    },
    {
        code: '872',
        provincecode: '87',
        name: 'Huyện Tháp Mười',
    },
    {
        code: '873',
        provincecode: '87',
        name: 'Huyện Cao Lãnh',
    },
    {
        code: '874',
        provincecode: '87',
        name: 'Huyện Thanh Bình',
    },
    {
        code: '875',
        provincecode: '87',
        name: 'Huyện Lấp Vò',
    },
    {
        code: '876',
        provincecode: '87',
        name: 'Huyện Lai Vung',
    },
    {
        code: '877',
        provincecode: '87',
        name: 'Huyện Châu Thành',
    },
    {
        code: '883',
        provincecode: '89',
        name: 'Thành phố Long Xuyên',
    },
    {
        code: '884',
        provincecode: '89',
        name: 'Thành phố Châu Đốc',
    },
    {
        code: '886',
        provincecode: '89',
        name: 'Huyện An Phú',
    },
    {
        code: '887',
        provincecode: '89',
        name: 'Thị xã Tân Châu',
    },
    {
        code: '888',
        provincecode: '89',
        name: 'Huyện Phú Tân',
    },
    {
        code: '889',
        provincecode: '89',
        name: 'Huyện Châu Phú',
    },
    {
        code: '890',
        provincecode: '89',
        name: 'Huyện Tịnh Biên',
    },
    {
        code: '891',
        provincecode: '89',
        name: 'Huyện Tri Tôn',
    },
    {
        code: '892',
        provincecode: '89',
        name: 'Huyện Châu Thành',
    },
    {
        code: '893',
        provincecode: '89',
        name: 'Huyện Chợ Mới',
    },
    {
        code: '894',
        provincecode: '89',
        name: 'Huyện Thoại Sơn',
    },
    {
        code: '899',
        provincecode: '91',
        name: 'Thành phố Rạch Giá',
    },
    {
        code: '900',
        provincecode: '91',
        name: 'Thị xã Hà Tiên',
    },
    {
        code: '902',
        provincecode: '91',
        name: 'Huyện Kiên Lương',
    },
    {
        code: '903',
        provincecode: '91',
        name: 'Huyện Hòn Đất',
    },
    {
        code: '904',
        provincecode: '91',
        name: 'Huyện Tân Hiệp',
    },
    {
        code: '905',
        provincecode: '91',
        name: 'Huyện Châu Thành',
    },
    {
        code: '906',
        provincecode: '91',
        name: 'Huyện Giồng Riềng',
    },
    {
        code: '907',
        provincecode: '91',
        name: 'Huyện Gò Quao',
    },
    {
        code: '908',
        provincecode: '91',
        name: 'Huyện An Biên',
    },
    {
        code: '909',
        provincecode: '91',
        name: 'Huyện An Minh',
    },
    {
        code: '910',
        provincecode: '91',
        name: 'Huyện Vĩnh Thuận',
    },
    {
        code: '911',
        provincecode: '91',
        name: 'Huyện Phú Quốc',
    },
    {
        code: '912',
        provincecode: '91',
        name: 'Huyện Kiên Hải',
    },
    {
        code: '913',
        provincecode: '91',
        name: 'Huyện U Minh Thượng',
    },
    {
        code: '914',
        provincecode: '91',
        name: 'Huyện Giang Thành',
    },
    {
        code: '916',
        provincecode: '92',
        name: 'Quận Ninh Kiều',
    },
    {
        code: '917',
        provincecode: '92',
        name: 'Quận Ô Môn',
    },
    {
        code: '918',
        provincecode: '92',
        name: 'Quận Bình Thuỷ',
    },
    {
        code: '919',
        provincecode: '92',
        name: 'Quận Cái Răng',
    },
    {
        code: '923',
        provincecode: '92',
        name: 'Quận Thốt Nốt',
    },
    {
        code: '924',
        provincecode: '92',
        name: 'Huyện Vĩnh Thạnh',
    },
    {
        code: '925',
        provincecode: '92',
        name: 'Huyện Cờ Đỏ',
    },
    {
        code: '926',
        provincecode: '92',
        name: 'Huyện Phong Điền',
    },
    {
        code: '927',
        provincecode: '92',
        name: 'Huyện Thới Lai',
    },
    {
        code: '930',
        provincecode: '93',
        name: 'Thành phố Vị Thanh',
    },
    {
        code: '931',
        provincecode: '93',
        name: 'Thị xã Ngã Bảy',
    },
    {
        code: '932',
        provincecode: '93',
        name: 'Huyện Châu Thành A',
    },
    {
        code: '933',
        provincecode: '93',
        name: 'Huyện Châu Thành',
    },
    {
        code: '934',
        provincecode: '93',
        name: 'Huyện Phụng Hiệp',
    },
    {
        code: '935',
        provincecode: '93',
        name: 'Huyện Vị Thuỷ',
    },
    {
        code: '936',
        provincecode: '93',
        name: 'Huyện Long Mỹ',
    },
    {
        code: '937',
        provincecode: '93',
        name: 'Thị xã Long Mỹ',
    },
    {
        code: '941',
        provincecode: '94',
        name: 'Thành phố Sóc Trăng',
    },
    {
        code: '942',
        provincecode: '94',
        name: 'Huyện Châu Thành',
    },
    {
        code: '943',
        provincecode: '94',
        name: 'Huyện Kế Sách',
    },
    {
        code: '944',
        provincecode: '94',
        name: 'Huyện Mỹ Tú',
    },
    {
        code: '945',
        provincecode: '94',
        name: 'Huyện Cù Lao Dung',
    },
    {
        code: '946',
        provincecode: '94',
        name: 'Huyện Long Phú',
    },
    {
        code: '947',
        provincecode: '94',
        name: 'Huyện Mỹ Xuyên',
    },
    {
        code: '948',
        provincecode: '94',
        name: 'Thị xã Ngã Năm',
    },
    {
        code: '949',
        provincecode: '94',
        name: 'Huyện Thạnh Trị',
    },
    {
        code: '950',
        provincecode: '94',
        name: 'Thị xã Vĩnh Châu',
    },
    {
        code: '951',
        provincecode: '94',
        name: 'Huyện Trần Đề',
    },
    {
        code: '954',
        provincecode: '95',
        name: 'Thành phố Bạc Liêu',
    },
    {
        code: '956',
        provincecode: '95',
        name: 'Huyện Hồng Dân',
    },
    {
        code: '957',
        provincecode: '95',
        name: 'Huyện Phước Long',
    },
    {
        code: '958',
        provincecode: '95',
        name: 'Huyện Vĩnh Lợi',
    },
    {
        code: '959',
        provincecode: '95',
        name: 'Thị xã Giá Rai',
    },
    {
        code: '960',
        provincecode: '95',
        name: 'Huyện Đông Hải',
    },
    {
        code: '961',
        provincecode: '95',
        name: 'Huyện Hoà Bình',
    },
    {
        code: '964',
        provincecode: '96',
        name: 'Thành phố Cà Mau',
    },
    {
        code: '966',
        provincecode: '96',
        name: 'Huyện U Minh',
    },
    {
        code: '967',
        provincecode: '96',
        name: 'Huyện Thới Bình',
    },
    {
        code: '968',
        provincecode: '96',
        name: 'Huyện Trần Văn Thời',
    },
    {
        code: '969',
        provincecode: '96',
        name: 'Huyện Cái Nước',
    },
    {
        code: '970',
        provincecode: '96',
        name: 'Huyện Đầm Dơi',
    },
    {
        code: '971',
        provincecode: '96',
        name: 'Huyện Năm Căn',
    },
    {
        code: '972',
        provincecode: '96',
        name: 'Huyện Phú Tân',
    },
    {
        code: '973',
        provincecode: '96',
        name: 'Huyện Ngọc Hiển',
    },
    {
        code: '001',
        provincecode: '01',
        name: 'Quận Ba Đình',
    },
    {
        code: '002',
        provincecode: '01',
        name: 'Quận Hoàn Kiếm',
    },
    {
        code: '003',
        provincecode: '01',
        name: 'Quận Tây Hồ',
    },
    {
        code: '004',
        provincecode: '01',
        name: 'Quận Long Biên',
    },
    {
        code: '005',
        provincecode: '01',
        name: 'Quận Cầu Giấy',
    },
    {
        code: '006',
        provincecode: '01',
        name: 'Quận Đống Đa',
    },
    {
        code: '007',
        provincecode: '01',
        name: 'Quận Hai Bà Trưng',
    },
    {
        code: '008',
        provincecode: '01',
        name: 'Quận Hoàng Mai',
    },
    {
        code: '009',
        provincecode: '01',
        name: 'Quận Thanh Xuân',
    },
    {
        code: '016',
        provincecode: '01',
        name: 'Huyện Sóc Sơn',
    },
    {
        code: '017',
        provincecode: '01',
        name: 'Huyện Đông Anh',
    },
    {
        code: '018',
        provincecode: '01',
        name: 'Huyện Gia Lâm',
    },
    {
        code: '019',
        provincecode: '01',
        name: 'Quận Nam Từ Liêm',
    },
    {
        code: '020',
        provincecode: '01',
        name: 'Huyện Thanh Trì',
    },
    {
        code: '021',
        provincecode: '01',
        name: 'Quận Bắc Từ Liêm',
    },
    {
        code: '024',
        provincecode: '02',
        name: 'Thành phố Hà Giang',
    },
    {
        code: '026',
        provincecode: '02',
        name: 'Huyện Đồng Văn',
    },
    {
        code: '027',
        provincecode: '02',
        name: 'Huyện Mèo Vạc',
    },
    {
        code: '028',
        provincecode: '02',
        name: 'Huyện Yên Minh',
    },
    {
        code: '029',
        provincecode: '02',
        name: 'Huyện Quản Bạ',
    },
    {
        code: '030',
        provincecode: '02',
        name: 'Huyện Vị Xuyên',
    },
    {
        code: '031',
        provincecode: '02',
        name: 'Huyện Bắc Mê',
    },
    {
        code: '032',
        provincecode: '02',
        name: 'Huyện Hoàng Su Phì',
    },
    {
        code: '033',
        provincecode: '02',
        name: 'Huyện Xín Mần',
    },
    {
        code: '034',
        provincecode: '02',
        name: 'Huyện Bắc Quang',
    },
    {
        code: '035',
        provincecode: '02',
        name: 'Huyện Quang Bình',
    },
    {
        code: '040',
        provincecode: '04',
        name: 'Thành phố Cao Bằng',
    },
    {
        code: '042',
        provincecode: '04',
        name: 'Huyện Bảo Lâm',
    },
    {
        code: '043',
        provincecode: '04',
        name: 'Huyện Bảo Lạc',
    },
    {
        code: '044',
        provincecode: '04',
        name: 'Huyện Thông Nông',
    },
    {
        code: '045',
        provincecode: '04',
        name: 'Huyện Hà Quảng',
    },
    {
        code: '046',
        provincecode: '04',
        name: 'Huyện Trà Lĩnh',
    },
    {
        code: '047',
        provincecode: '04',
        name: 'Huyện Trùng Khánh',
    },
    {
        code: '048',
        provincecode: '04',
        name: 'Huyện Hạ Lang',
    },
    {
        code: '049',
        provincecode: '04',
        name: 'Huyện Quảng Uyên',
    },
    {
        code: '050',
        provincecode: '04',
        name: 'Huyện Phục Hoà',
    },
    {
        code: '051',
        provincecode: '04',
        name: 'Huyện Hoà An',
    },
    {
        code: '052',
        provincecode: '04',
        name: 'Huyện Nguyên Bình',
    },
    {
        code: '053',
        provincecode: '04',
        name: 'Huyện Thạch An',
    },
    {
        code: '058',
        provincecode: '06',
        name: 'Thành Phố Bắc Kạn',
    },
    {
        code: '060',
        provincecode: '06',
        name: 'Huyện Pác Nặm',
    },
    {
        code: '061',
        provincecode: '06',
        name: 'Huyện Ba Bể',
    },
    {
        code: '062',
        provincecode: '06',
        name: 'Huyện Ngân Sơn',
    },
    {
        code: '063',
        provincecode: '06',
        name: 'Huyện Bạch Thông',
    },
    {
        code: '064',
        provincecode: '06',
        name: 'Huyện Chợ Đồn',
    },
    {
        code: '065',
        provincecode: '06',
        name: 'Huyện Chợ Mới',
    },
    {
        code: '066',
        provincecode: '06',
        name: 'Huyện Na Rì',
    },
    {
        code: '070',
        provincecode: '08',
        name: 'Thành phố Tuyên Quang',
    },
    {
        code: '071',
        provincecode: '08',
        name: 'Huyện Lâm Bình',
    },
    {
        code: '072',
        provincecode: '08',
        name: 'Huyện Nà Hang',
    },
    {
        code: '073',
        provincecode: '08',
        name: 'Huyện Chiêm Hóa',
    },
    {
        code: '074',
        provincecode: '08',
        name: 'Huyện Hàm Yên',
    },
    {
        code: '075',
        provincecode: '08',
        name: 'Huyện Yên Sơn',
    },
    {
        code: '076',
        provincecode: '08',
        name: 'Huyện Sơn Dương',
    },
    {
        code: '080',
        provincecode: '10',
        name: 'Thành phố Lào Cai',
    },
    {
        code: '082',
        provincecode: '10',
        name: 'Huyện Bát Xát',
    },
    {
        code: '083',
        provincecode: '10',
        name: 'Huyện Mường Khương',
    },
    {
        code: '084',
        provincecode: '10',
        name: 'Huyện Si Ma Cai',
    },
    {
        code: '085',
        provincecode: '10',
        name: 'Huyện Bắc Hà',
    },
    {
        code: '086',
        provincecode: '10',
        name: 'Huyện Bảo Thắng',
    },
    {
        code: '087',
        provincecode: '10',
        name: 'Huyện Bảo Yên',
    },
    {
        code: '088',
        provincecode: '10',
        name: 'Huyện Sa Pa',
    },
    {
        code: '089',
        provincecode: '10',
        name: 'Huyện Văn Bàn',
    },
    {
        code: '094',
        provincecode: '11',
        name: 'Thành phố Điện Biên Phủ',
    },
    {
        code: '095',
        provincecode: '11',
        name: 'Thị Xã Mường Lay',
    },
    {
        code: '096',
        provincecode: '11',
        name: 'Huyện Mường Nhé',
    },
    {
        code: '097',
        provincecode: '11',
        name: 'Huyện Mường Chà',
    },
    {
        code: '098',
        provincecode: '11',
        name: 'Huyện Tủa Chùa',
    },
    {
        code: '099',
        provincecode: '11',
        name: 'Huyện Tuần Giáo',
    },
    {
        code: '318',
        provincecode: '31',
        name: 'Huyện đảo Bạch Long Vĩ',
    },
    {
        code: '498',
        provincecode: '48',
        name: 'Huyện đảo Hoàng Sa',
    },
    {
        code: '754',
        provincecode: '77',
        name: 'Thị xã Phú Mỹ',
    },
    {
        code: '755',
        provincecode: '77',
        name: 'Huyện đảo Côn Đảo',
    },
    {
        code: '471',
        provincecode: '45',
        name: 'Huyện đảo Cồn Cỏ',
    },
];
