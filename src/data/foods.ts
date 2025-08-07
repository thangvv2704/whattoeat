import { CategoryInfo, FoodItem } from '../types';

export const categories: CategoryInfo[] = [
  {
    id: 'any',
    name: 'Bất kỳ',
    emoji: '🍽️',
    description: 'Tất cả món ăn'
  },
  {
    id: 'snack',
    name: 'Ăn vặt',
    emoji: '🍿',
    description: 'Món ăn nhẹ'
  },
  {
    id: 'healthy',
    name: 'Healthy',
    emoji: '🥗',
    description: 'Món ăn tốt cho sức khỏe'
  },
  {
    id: 'dessert',
    name: 'Đồ ngọt',
    emoji: '🍰',
    description: 'Món tráng miệng'
  },
  {
    id: 'main',
    name: 'Ăn mặn',
    emoji: '🍖',
    description: 'Món chính'
  },
  {
    id: 'random',
    name: 'Random xàm',
    emoji: '🎲',
    description: 'Món ăn độc đáo'
  }
];

export const foods: FoodItem[] = [
  // Món chính
  { id: '1', name: 'Phở bò', category: 'main', emoji: '🍜', description: 'Phở bò truyền thống' },
  { id: '2', name: 'Bún chả', category: 'main', emoji: '🍜', description: 'Bún chả Hà Nội' },
  { id: '3', name: 'Cơm tấm', category: 'main', emoji: '🍚', description: 'Cơm tấm Sài Gòn' },
  { id: '4', name: 'Bánh mì', category: 'main', emoji: '🥖', description: 'Bánh mì thịt' },
  { id: '5', name: 'Bún bò Huế', category: 'main', emoji: '🍜', description: 'Bún bò Huế cay' },
  { id: '6', name: 'Cao lầu', category: 'main', emoji: '🍜', description: 'Cao lầu Hội An' },
  { id: '7', name: 'Mì Quảng', category: 'main', emoji: '🍜', description: 'Mì Quảng Đà Nẵng' },
  { id: '8', name: 'Bún riêu', category: 'main', emoji: '🍜', description: 'Bún riêu cua' },
  { id: '9', name: 'Chả cá', category: 'main', emoji: '🐟', description: 'Chả cá Lã Vọng' },
  { id: '10', name: 'Bánh cuốn', category: 'main', emoji: '🥟', description: 'Bánh cuốn Thanh Trì' },
  { id: '51', name: 'Bún thịt nướng', category: 'main', emoji: '🍜', description: 'Bún thịt nướng chả' },
  { id: '52', name: 'Cơm gà', category: 'main', emoji: '🍚', description: 'Cơm gà xối mỡ' },
  { id: '53', name: 'Bún bò Nam Bộ', category: 'main', emoji: '🍜', description: 'Bún bò Nam Bộ' },
  { id: '54', name: 'Phở gà', category: 'main', emoji: '🍜', description: 'Phở gà thơm ngon' },
  { id: '55', name: 'Bún mắm', category: 'main', emoji: '🍜', description: 'Bún mắm miền Tây' },
  { id: '56', name: 'Cơm tấm sườn bì chả', category: 'main', emoji: '🍚', description: 'Cơm tấm đầy đủ' },
  { id: '57', name: 'Bánh mì thịt nướng', category: 'main', emoji: '🥖', description: 'Bánh mì thịt nướng' },
  { id: '58', name: 'Bún chả cá', category: 'main', emoji: '🍜', description: 'Bún chả cá' },
  { id: '59', name: 'Phở cuốn', category: 'main', emoji: '🥟', description: 'Phở cuốn Hà Nội' },
  { id: '60', name: 'Bún ốc', category: 'main', emoji: '🍜', description: 'Bún ốc truyền thống' },
  
  // Ăn vặt
  { id: '11', name: 'Bánh tráng nướng', category: 'snack', emoji: '🔥', description: 'Bánh tráng nướng Đà Lạt' },
  { id: '12', name: 'Bánh xèo', category: 'snack', emoji: '🥞', description: 'Bánh xèo miền Tây' },
  { id: '13', name: 'Gỏi cuốn', category: 'snack', emoji: '🥬', description: 'Gỏi cuốn tôm thịt' },
  { id: '14', name: 'Chả giò', category: 'snack', emoji: '🥟', description: 'Chả giò truyền thống' },
  { id: '15', name: 'Bánh mì nướng', category: 'snack', emoji: '🥖', description: 'Bánh mì nướng bơ' },
  { id: '16', name: 'Bánh tráng trộn', category: 'snack', emoji: '🥗', description: 'Bánh tráng trộn' },
  { id: '17', name: 'Bánh đúc', category: 'snack', emoji: '🍮', description: 'Bánh đúc nóng' },
  { id: '18', name: 'Bánh bèo', category: 'snack', emoji: '🥄', description: 'Bánh bèo Huế' },
  { id: '19', name: 'Bánh ít', category: 'snack', emoji: '🥟', description: 'Bánh ít trần' },
  { id: '20', name: 'Bánh bột lọc', category: 'snack', emoji: '🥟', description: 'Bánh bột lọc Huế' },
  { id: '61', name: 'Bánh mì chảo', category: 'snack', emoji: '🍳', description: 'Bánh mì chảo trứng' },
  { id: '62', name: 'Bánh mì xíu mại', category: 'snack', emoji: '🥖', description: 'Bánh mì xíu mại' },
  { id: '63', name: 'Bánh mì chả lụa', category: 'snack', emoji: '🥖', description: 'Bánh mì chả lụa' },
  { id: '64', name: 'Bánh cuốn nóng', category: 'snack', emoji: '🥟', description: 'Bánh cuốn nóng' },
  { id: '65', name: 'Bánh đa cua', category: 'snack', emoji: '🍜', description: 'Bánh đa cua Hải Phòng' },
  { id: '66', name: 'Bánh mì pate', category: 'snack', emoji: '🥖', description: 'Bánh mì pate' },
  { id: '67', name: 'Bánh mì thịt nguội', category: 'snack', emoji: '🥖', description: 'Bánh mì thịt nguội' },
  { id: '68', name: 'Bánh mì chả bò', category: 'snack', emoji: '🥖', description: 'Bánh mì chả bò' },
  { id: '69', name: 'Bánh mì thịt bò', category: 'snack', emoji: '🥖', description: 'Bánh mì thịt bò' },
  { id: '70', name: 'Bánh mì thịt heo', category: 'snack', emoji: '🥖', description: 'Bánh mì thịt heo' },
  
  // Healthy
  { id: '21', name: 'Gỏi ngó sen', category: 'healthy', emoji: '🥗', description: 'Gỏi ngó sen tôm thịt' },
  { id: '22', name: 'Canh chua', category: 'healthy', emoji: '🍲', description: 'Canh chua cá lóc' },
  { id: '23', name: 'Rau muống xào', category: 'healthy', emoji: '🥬', description: 'Rau muống xào tỏi' },
  { id: '24', name: 'Canh bí đỏ', category: 'healthy', emoji: '🎃', description: 'Canh bí đỏ thịt bằm' },
  { id: '25', name: 'Gỏi đu đủ', category: 'healthy', emoji: '🥗', description: 'Gỏi đu đủ khô bò' },
  { id: '26', name: 'Canh mồng tơi', category: 'healthy', emoji: '🥬', description: 'Canh mồng tơi cua' },
  { id: '27', name: 'Rau cải xào', category: 'healthy', emoji: '🥬', description: 'Rau cải xào nấm' },
  { id: '28', name: 'Canh rau ngót', category: 'healthy', emoji: '🥬', description: 'Canh rau ngót thịt bằm' },
  { id: '29', name: 'Gỏi bưởi', category: 'healthy', emoji: '🍊', description: 'Gỏi bưởi tôm khô' },
  { id: '30', name: 'Canh chua bạc hà', category: 'healthy', emoji: '🍲', description: 'Canh chua bạc hà' },
  { id: '71', name: 'Gỏi gà', category: 'healthy', emoji: '🥗', description: 'Gỏi gà rau răm' },
  { id: '72', name: 'Canh cải chua', category: 'healthy', emoji: '🍲', description: 'Canh cải chua cá' },
  { id: '73', name: 'Rau lang xào', category: 'healthy', emoji: '🥬', description: 'Rau lang xào tỏi' },
  { id: '74', name: 'Canh rau dền', category: 'healthy', emoji: '🥬', description: 'Canh rau dền tôm' },
  { id: '75', name: 'Gỏi sứa', category: 'healthy', emoji: '🥗', description: 'Gỏi sứa tôm thịt' },
  { id: '76', name: 'Canh bầu', category: 'healthy', emoji: '🍲', description: 'Canh bầu tôm' },
  { id: '77', name: 'Rau đay nấu', category: 'healthy', emoji: '🥬', description: 'Rau đay nấu cua' },
  { id: '78', name: 'Canh chua rau muống', category: 'healthy', emoji: '🍲', description: 'Canh chua rau muống' },
  { id: '79', name: 'Gỏi tôm', category: 'healthy', emoji: '🥗', description: 'Gỏi tôm rau răm' },
  { id: '80', name: 'Canh rau cải', category: 'healthy', emoji: '🍲', description: 'Canh rau cải thịt bằm' },
  
  // Đồ ngọt
  { id: '31', name: 'Chè ba màu', category: 'dessert', emoji: '🍧', description: 'Chè ba màu Sài Gòn' },
  { id: '32', name: 'Bánh flan', category: 'dessert', emoji: '🍮', description: 'Bánh flan truyền thống' },
  { id: '33', name: 'Chè hạt sen', category: 'dessert', emoji: '🍧', description: 'Chè hạt sen long nhãn' },
  { id: '34', name: 'Bánh tiêu', category: 'dessert', emoji: '🍩', description: 'Bánh tiêu đường' },
  { id: '35', name: 'Chè đậu xanh', category: 'dessert', emoji: '🍧', description: 'Chè đậu xanh nước cốt dừa' },
  { id: '36', name: 'Bánh bò', category: 'dessert', emoji: '🍰', description: 'Bánh bò nướng' },
  { id: '37', name: 'Chè chuối', category: 'dessert', emoji: '🍌', description: 'Chè chuối nếp' },
  { id: '38', name: 'Bánh da lợn', category: 'dessert', emoji: '🍰', description: 'Bánh da lợn' },
  { id: '39', name: 'Chè sương sa', category: 'dessert', emoji: '🍧', description: 'Chè sương sa hạt lựu' },
  { id: '40', name: 'Bánh tét', category: 'dessert', emoji: '🍙', description: 'Bánh tét chuối' },
  { id: '81', name: 'Chè trôi nước', category: 'dessert', emoji: '🍧', description: 'Chè trôi nước đậu xanh' },
  { id: '82', name: 'Bánh bông lan', category: 'dessert', emoji: '🍰', description: 'Bánh bông lan trứng' },
  { id: '83', name: 'Chè đậu đỏ', category: 'dessert', emoji: '🍧', description: 'Chè đậu đỏ nước cốt dừa' },
  { id: '84', name: 'Bánh kem', category: 'dessert', emoji: '🎂', description: 'Bánh kem sinh nhật' },
  { id: '85', name: 'Chè thái', category: 'dessert', emoji: '🍧', description: 'Chè thái đặc biệt' },
  { id: '86', name: 'Bánh dẻo', category: 'dessert', emoji: '🥮', description: 'Bánh dẻo truyền thống' },
  { id: '87', name: 'Chè khoai môn', category: 'dessert', emoji: '🍧', description: 'Chè khoai môn nước cốt dừa' },
  { id: '88', name: 'Bánh nướng', category: 'dessert', emoji: '🥮', description: 'Bánh nướng truyền thống' },
  { id: '89', name: 'Chè bưởi', category: 'dessert', emoji: '🍧', description: 'Chè bưởi thơm ngon' },
  { id: '90', name: 'Bánh chưng', category: 'dessert', emoji: '🍙', description: 'Bánh chưng truyền thống' },
  
  // Random xàm
  { id: '41', name: 'Bánh mì chảo', category: 'random', emoji: '🍳', description: 'Bánh mì chảo trứng' },
  { id: '42', name: 'Cơm rang dưa bò', category: 'random', emoji: '🍚', description: 'Cơm rang dưa bò' },
  { id: '43', name: 'Bún chả cá', category: 'random', emoji: '🍜', description: 'Bún chả cá' },
  { id: '44', name: 'Bánh mì xíu mại', category: 'random', emoji: '🥖', description: 'Bánh mì xíu mại' },
  { id: '45', name: 'Cơm tấm sườn bì chả', category: 'random', emoji: '🍚', description: 'Cơm tấm sườn bì chả' },
  { id: '46', name: 'Bún thịt nướng', category: 'random', emoji: '🍜', description: 'Bún thịt nướng' },
  { id: '47', name: 'Bánh mì thịt nướng', category: 'random', emoji: '🥖', description: 'Bánh mì thịt nướng' },
  { id: '48', name: 'Cơm gà', category: 'random', emoji: '🍚', description: 'Cơm gà xối mỡ' },
  { id: '49', name: 'Bún bò Nam Bộ', category: 'random', emoji: '🍜', description: 'Bún bò Nam Bộ' },
  { id: '50', name: 'Bánh mì chả lụa', category: 'random', emoji: '🥖', description: 'Bánh mì chả lụa' },
  { id: '91', name: 'Cơm rang thập cẩm', category: 'random', emoji: '🍚', description: 'Cơm rang thập cẩm' },
  { id: '92', name: 'Bún mắm', category: 'random', emoji: '🍜', description: 'Bún mắm miền Tây' },
  { id: '93', name: 'Bánh mì pate', category: 'random', emoji: '🥖', description: 'Bánh mì pate' },
  { id: '94', name: 'Cơm rang cải chua', category: 'random', emoji: '🍚', description: 'Cơm rang cải chua' },
  { id: '95', name: 'Bún ốc', category: 'random', emoji: '🍜', description: 'Bún ốc truyền thống' },
  { id: '96', name: 'Bánh mì thịt nguội', category: 'random', emoji: '🥖', description: 'Bánh mì thịt nguội' },
  { id: '97', name: 'Cơm rang dưa cải', category: 'random', emoji: '🍚', description: 'Cơm rang dưa cải' },
  { id: '98', name: 'Bún mắm nêm', category: 'random', emoji: '🍜', description: 'Bún mắm nêm' },
  { id: '99', name: 'Bánh mì chả bò', category: 'random', emoji: '🥖', description: 'Bánh mì chả bò' },
  { id: '100', name: 'Cơm rang kim chi', category: 'random', emoji: '🍚', description: 'Cơm rang kim chi' }
]; 