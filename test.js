const friends = [
  { id: 98, name: 'coco' },
  { id: 765, name: 'pedro' },
  { id: 5, name: 'franco' },
];

function test(friend) {
  return friend.id == 5;
}

const result = friends.find(test);
console.log(result);
