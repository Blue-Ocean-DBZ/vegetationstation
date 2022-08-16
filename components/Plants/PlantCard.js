import React from 'react';
// save for Jon
let dummyData = [
  {
    name: 'PlantOne',
    owner: 'Brandon',
    location: 'LA',
    distance: '12 mi away',
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  },
  {
    name: 'PlantTwo',
    owner: 'Shannon',
    location: 'SF',
    distance: '312 mi away',
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },
  {
    name: 'PlantThree',
    owner: 'Carson',
    location: 'OC',
    distance: '24 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmF6j-VfIy1CwkaCi4L_YJH5hl1qGsufLD4A&usqp=CAU',
  },
  {
    name: 'PlantFour',
    owner: 'Gian',
    location: 'Stockton',
    distance: '246 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbIHw3oUEi2EAMDD6AHDe2j37Y2JuEozh6tg&usqp=CAU',
  },
  {
    name: 'PlantFive',
    owner: 'Jonathan',
    location: 'LA',
    distance: '12 mi away',
    url: 'https://empire-s3-production.bobvila.com/slides/30451/original/Gloxinia-flowering-houseplants.jpg?1551987245',
  },
  {
    name: 'PlantSix',
    owner: 'David',
    location: 'Sacramento',
    distance: '442 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9HZXoUNWkyvVOQhBOKI6Te9WAEjL35peDcA&usqp=CAU',
  },{
    name: 'PlantSeven',
    owner: 'Kevin',
    location: 'Cupertino',
    distance: '246 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJi4K4-eM57BhLUM8dOqS5PV0FZUN-2usMw&usqp=CAU',
  },
  {
    name: 'PlantEight',
    owner: 'Theresa',
    location: 'OC',
    distance: '12 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowhGAXIPf4gl8Tp1sQF9_zgxP8Xx36mBFTA&usqp=CAU',
  },
  {
    name: 'PlantNine',
    owner: 'Clayton',
    location: 'Sacramento',
    distance: '442 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCTPKnYjEN3XdLC7PMgo9qViE-4-VK-JvKw&usqp=CAU',
  },
];


export default const PlantCard = (dummyData) => {

  const prop = dummyData[0];

  return (
    <View style= {styles.plantInformationContainer}>
      <View>
        <Image source= {{url: item.url}} style= {styles.plantImage}/>
      </View>
      <View style= {styles.item}>
        <View style= {styles.plantInfoWithHeartButton}>
          <View>
            <View style={styles.plantName}>
              <Text style= {styles.title}>{item.name}</Text>
            </View>
            <View>
              <Text style= {styles.otherPlantInfo}>{item.location}</Text>
              <Text style= {styles.otherPlantInfo}>{item.distance}</Text>
              <Text style= {styles.otherPlantInfo}>{item.owner}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress= {() => {deleteFavorite(item.url)}}>
            <Fontisto name="heart" size={20} color="red" style= {styles.heart}/>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  )
}