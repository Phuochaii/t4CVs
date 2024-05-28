import { CompanySchema } from '../schema';

export const companies: CompanySchema[] = [
  {
    id: 1,
    field: 3,
    taxCode: '55648-715',
    name: 'DuBuque-Powlowski',
    address: '8 Colorado Place',
    phone: '657-515-7858',
    companySize: 11,
    status: false,
    website:
      'https://ucoz.ru/nisl/nunc/rhoncus/dui/vel/sem/sed.html?arcu=ut&adipiscing=blandit&molestie=non&hendrerit=interdum&at=in&vulputate=ante&vitae=vestibulum&nisl=ante    ',
    image:
      'data:image/jpeg;base64,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',
    description:
      'DuBuque-Powlowski: DuBuque-Powlowski là một công ty tài chính tiên tiến, chúng tôi cung cấp các giải pháp tài chính đa dạng và cá nhân hóa để hỗ trợ khách hàng trong việc quản lý và tối ưu hóa tài chính cá nhân và doanh nghiệp.',
  },
  {
    id: 2,
    field: 8,
    taxCode: '25021-202',
    name: 'Runolfsdottir, Upton and Nienow',
    address: '88 Kingsford Junction',
    phone: '423-836-3889',
    companySize: 7223,
    status: true,
    website:
      'http://jimdo.com/lacus/at/velit.aspx?justo=pellentesque&lacinia=volutpat&eget=dui&tincidunt=maecenas&eget=tristique&tempus=est&vel=et&pede=tempus&morbi=semper&porttitor=est&lorem=quam&id=pharetra&ligula=magna&suspendisse=ac&ornare=consequat&consequat=metus&lectus=sapien&in=ut&est=nunc&risus=vestibulum&auctor=ante&sed=ipsum&tristique=primis&in=in&tempus=faucibus&sit=orci&amet=luctus&sem=et&fusce=ultrices&consequat=posuere&nulla=cubilia&nisl=curae&nunc=mauris&nisl=viverra&duis=diam&bibendum=vitae&felis=quam&sed=suspendisse&interdum=potenti&venenatis=nullam&turpis=porttitor&enim=lacus&blandit=at&mi=turpis&in=donec&porttitor=posuere&pede=metus&justo=vitae&eu=ipsum&massa=aliquam&donec=non&dapibus=mauris&duis=morbi&at=non&velit=lectus&eu=aliquam&est=sit&congue=amet&elementum=diam&in=in&hac=magna&habitasse=bibendum&platea=imperdiet&dictumst=nullam&morbi=orci&vestibulum=pede&velit=venenatis&id=non&pretium=sodales&iaculis=sed&diam=tincidunt&erat=eu&fermentum=felis&justo=fusce&nec=posuere&condimentum=felis',
    image:
      'data:image/jpeg;base64,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',
    description:
      'Runolfsdottir, Upton and Nienow: Runolfsdottir, Upton and Nienow là một công ty nghệ thuật và thiết kế độc đáo, chúng tôi tận dụng sự sáng tạo và kỹ năng thiết kế để tạo ra các trải nghiệm độc đáo và tinh tế cho khách hàng của mình.    ',
  },
  {
    id: 3,
    field: 12,
    taxCode: '16714-661',
    name: 'Stokes-Raynor',
    address: '82 1st Court',
    phone: '400-267-2428',
    companySize: 34,
    status: true,
    website:
      'http://mediafire.com/natoque/penatibus/et/magnis/dis/parturient.aspx?turpis=nisl&elementum=ut&ligula=volutpat&vehicula=sapien&consequat=arcu&morbi=sed&a=augue&ipsum=aliquam&integer=erat&a=volutpat&nibh=in&in=congue&quis=etiam&justo=justo&maecenas=etiam&rhoncus=pretium&aliquam=iaculis&lacus=justo&morbi=in&quis=hac&tortor=habitasse&id=platea&nulla=dictumst&ultrices=etiam&aliquet=faucibus&maecenas=cursus&leo=urna&odio=ut&condimentum=tellus&id=nulla&luctus=ut&nec=erat&molestie=id&sed=mauris&justo=vulputate&pellentesque=elementum&viverra=nullam&pede=varius&ac=nulla&diam=facilisi&cras=cras&pellentesque=non&volutpat=velit&dui=nec&maecenas=nisi&tristique=vulputate&est=nonummy&et=maecenas&tempus=tincidunt&semper=lacus&est=at&quam=velit&pharetra=vivamus&magna=vel',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1IXYhj9AsIItn9LkwelZxPB4WFxXg7fTYw&s',
    description:
      'Stokes-Raynor: Stokes-Raynor là một công ty bán lẻ đa ngành, chúng tôi cung cấp một loạt các sản phẩm và dịch vụ chất lượng cao để đáp ứng nhu cầu mua sắm đa dạng của khách hàng.',
  },
  {
    id: 4,
    field: 14,
    taxCode: '41163-856',
    name: 'Marvin LLC',
    address: '32 Pierstorff Place',
    phone: '570-284-0876',
    companySize: 925,
    status: false,
    website:
      'http://springer.com/odio/porttitor.xml?pretium=et&iaculis=ultrices&diam=posuere&erat=cubilia&fermentum=curae&justo=nulla&nec=dapibus&condimentum=dolor&neque=vel&sapien=est&placerat=donec&ante=odio&nulla=justo&justo=sollicitudin&aliquam=ut&quis=suscipit&turpis=a&eget=feugiat&elit=et&sodales=eros&scelerisque=vestibulum&mauris=ac&sit=est&amet=lacinia&eros=nisi&suspendisse=venenatis&accumsan=tristique&tortor=fusce&quis=congue&turpis=diam&sed=id&ante=ornare&vivamus=imperdiet&tortor=sapien&duis=urna&mattis=pretium&egestas=nisl&metus=ut&aenean=volutpat&fermentum=sapien&donec=arcu&ut=sed&mauris=augue&eget=aliquam&massa=erat&tempor=volutpat&convallis=in&nulla=congue&neque=etiam&libero=justo&convallis=etiam&eget=pretium&eleifend=iaculis&luctus=justo&ultricies=in&eu=hac&nibh=habitasse&quisque=platea&id=dictumst&justo=etiam&sit=faucibus&amet=cursus&sapien=urna&dignissim=ut&vestibulum=tellus&vestibulum=nulla&ante=ut&ipsum=erat&primis=id&in=mauris&faucibus=vulputate&orci=elementum&luctus=nullam&et=varius&ultrices=nulla&posuere=facilisi&cubilia=cras&curae=non&nulla=velit&dapibus=nec&dolor=nisi&vel=vulputate&est=nonummy    ',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmGYQIlP43cYnFWkgke02hpZDvZmR0DlvDrQ&s',
    description:
      'Marvin LLC: Marvin LLC là một công ty truyền thông và truyền thông hàng đầu, chúng tôi tập trung vào việc tạo ra các nội dung sáng tạo và hiệu quả để kết nối và tương tác với khán giả.    ',
  },
  {
    id: 5,
    field: 1,
    taxCode: '25021-101',
    name: 'Murphy Group',
    address: '03450 Sugar Alley',
    phone: '102-132-1562',
    companySize: 8613,
    status: false,
    website:
      'https://posterous.com/risus/semper/porta/volutpat/quam.xml?aliquet=eu&ultrices=sapien&erat=cursus&tortor=vestibulum&sollicitudin=proin&mi=eu&sit=mi&amet=nulla&lobortis=ac&sapien=enim&sapien=in&non=tempor&mi=turpis&integer=nec&ac=euismod&neque=scelerisque&duis=quam&bibendum=turpis&morbi=adipiscing&non=lorem&quam=vitae&nec=mattis&dui=nibh&luctus=ligula&rutrum=nec&nulla=sem&tellus=duis&in=aliquam&sagittis=convallis&dui=nunc&vel=proin&nisl=at&duis=turpis&ac=a&nibh=pede&fusce=posuere&lacus=nonummy&purus=integer&aliquet=non&at=velit&feugiat=donec&non=diam&pretium=neque&quis=vestibulum&lectus=eget&suspendisse=vulputate&potenti=ut&in=ultrices',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1IXYhj9AsIItn9LkwelZxPB4WFxXg7fTYw&s',
    description:
      'Murphy Group: Murphy Group là một công ty công nghệ tiên phong, chúng tôi phát triển và triển khai các giải pháp công nghệ thông tin đột phá để giúp các doanh nghiệp vượt qua thách thức kỹ thuật của thế giới hiện đại.',
  },
  {
    id: 6,
    field: 5,
    taxCode: '55526-0002',
    name: 'Fadel, Hettinger and Koelpin',
    address: '363 Esch Pass',
    phone: '322-894-4346',
    companySize: 9119,
    status: true,
    website:
      'https://cdbaby.com/in/faucibus.jpg?ante=integer&nulla=pede&justo=justo&aliquam=lacinia&quis=eget&turpis=tincidunt&eget=eget&elit=tempus&sodales=vel&scelerisque=pede',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyk9CqQmWxWWVkyKCKvlw-NNZhBvq0_gn5Vw&s',
    description:
      'Fadel, Hettinger and Koelpin: Fadel, Hettinger and Koelpin là một công ty tư vấn hàng đầu, chúng tôi cung cấp các giải pháp tư vấn chuyên sâu và cá nhân hóa để hỗ trợ khách hàng trong việc phát triển và thịnh vượng.',
  },
  {
    id: 7,
    field: 10,
    taxCode: '68151-3838',
    name: 'Kuvalis-Quitzon',
    address: '976 Muir Hill',
    phone: '175-699-2025',
    companySize: 9159,
    status: true,
    website:
      'http://un.org/velit/nec/nisi/vulputate/nonummy/maecenas/tincidunt.xml?integer=blandit&ac=non&neque=interdum&duis=in&bibendum=ante&morbi=vestibulum&non=ante&quam=ipsum&nec=primis&dui=in&luctus=faucibus&rutrum=orci&nulla=luctus&tellus=et&in=ultrices&sagittis=posuere&dui=cubilia&vel=curae&nisl=duis&duis=faucibus&ac=accumsan&nibh=odio&fusce=curabitur',
    image:
      'https://img.indiafilings.com/learn/wp-content/uploads/2016/09/12010621/Company-Management.jpg',
    description:
      'Kuvalis-Quitzon: Kuvalis-Quitzon là một công ty kỹ thuật hàng đầu, chúng tôi đẩy mạnh sự sáng tạo và kỹ năng kỹ thuật để tạo ra các giải pháp kỹ thuật tiên tiến và hiệu quả cho các dự án kỹ thuật khó khăn nhất.',
  },
  {
    id: 8,
    field: 3,
    taxCode: '11994-006',
    name: 'Casper Inc',
    address: '3 Bobwhite Drive',
    phone: '324-191-3439',
    companySize: 27226,
    status: false,
    website:
      'https://berkeley.edu/ut/ultrices/vel/augue.json?dolor=nulla&vel=justo&est=aliquam&donec=quis&odio=turpis&justo=eget&sollicitudin=elit&ut=sodales&suscipit=scelerisque&a=mauris&feugiat=sit&et=amet&eros=eros&vestibulum=suspendisse',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbp2kr_7winCRW1FiSynjwm4YXd30HRwiRH5B2EV3NMI1BWlQ35kxGN_IDfJnIca6F8To&usqp=CAU',
    description:
      'Casper Inc: Casper Inc là một công ty tiếp thị và quảng cáo hàng đầu, chúng tôi tạo ra các chiến lược tiếp thị sáng tạo và hiệu quả để giúp các doanh nghiệp tăng cường sự hiện diện và tương tác trực tuyến của họ.',
  },
  {
    id: 9,
    field: 4,
    taxCode: '0832-0401',
    name: "O'Keefe-Keebler",
    address: '3699 Lillian Crossing',
    phone: '448-385-3973',
    companySize: 91,
    status: true,
    website:
      'https://technorati.com/felis/eu/sapien/cursus.aspx?in=ut&felis=ultrices&eu=vel&sapien=augue&cursus=vestibulum&vestibulum=ante&proin=ipsum&eu=primis&mi=in&nulla=faucibus&ac=orci&enim=luctus&in=et&tempor=ultrices&turpis=posuere&nec=cubilia&euismod=curae&scelerisque=donec',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZGBoJoXtHhaRSXltpf8UOjEpDhzaU_Pdb4g&s',
    description:
      'O Keefe-Keebler: O Keefe-Keebler là một công ty giáo dục hàng đầu, chúng tôi cam kết cung cấp các giải pháp giáo dục đổi mới và phù hợp với nhu cầu học tập của các cá nhân và tổ chức.',
  },
  {
    id: 10,
    field: 6,
    taxCode: '63629-4501',
    name: 'Hickle-Buckridge',
    address: '93 Crest Line Park',
    phone: '381-209-9439',
    companySize: 7343,
    status: true,
    website:
      'https://gov.uk/ac/tellus/semper.html?nulla=convallis&pede=eget&ullamcorper=eleifend&augue=luctus&a=ultricies',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRd8Zgk49XMb1z3OeGU4SGIZNOdNhuzHUKg&s',
    description:
      'Hickle-Buckridge: Hickle-Buckridge là một công ty luật hàng đầu, chúng tôi cung cấp các dịch vụ pháp lý chuyên nghiệp và đáng tin cậy để hỗ trợ khách hàng trong các vấn đề pháp lý phức tạp.',
  },
  {
    id: 11,
    field: 9,
    taxCode: '36800-214',
    name: 'Oberbrunner, Emard and Kiehn',
    address: '122 Clove Parkway',
    phone: '344-529-4387',
    companySize: 77,
    status: true,
    website:
      'http://oracle.com/libero/non/mattis/pulvinar.html?vitae=commodo&nisl=vulputate&aenean=justo&lectus=in&pellentesque=blandit&eget=ultrices&nunc=enim&donec=lorem&quis=ipsum&orci=dolor&eget=sit&orci=amet&vehicula=consectetuer&condimentum=adipiscing&curabitur=elit',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqBUkhZhBJ9-B5gBgnFaTn1MXcE2vce4YBTA&s',
    description:
      ' Oberbrunner, Emard and Kiehn là một công ty luật hàng đầu, chúng tôi chuyên cung cấp các dịch vụ pháp lý chuyên nghiệp và đáng tin cậy cho khách hàng cá nhân và doanh nghiệp. Với đội ngũ luật sư có kinh nghiệm và am hiểu sâu sắc về hệ thống pháp luật, chúng tôi cam kết đồng hành và hỗ trợ khách hàng trong mọi vấn đề pháp lý từ phức tạp đến cơ bản. Sứ mệnh của chúng tôi là bảo vệ quyền lợi và lợi ích của khách hàng và đảm bảo họ nhận được sự bảo vệ và giải quyết công bằng trong mọi tình huống pháp lý.',
  },
];
