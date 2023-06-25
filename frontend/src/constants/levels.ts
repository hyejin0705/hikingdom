import flower from 'assets/levels/flower.png'
import forest from 'assets/levels/forest.png'
import fruit from 'assets/levels/fruit.png'
import god from 'assets/levels/god.png'
import leaf from 'assets/levels/leaf.png'
import mountain from 'assets/levels/mountain.png'
import seed from 'assets/levels/seed.png'
import sprout from 'assets/levels/sprout.png'
import tree from 'assets/levels/tree.png'
import twig from 'assets/levels/twig.png'

const LEVEL_TO_IMG: { [key: number]: string } = {
  1: seed,
  2: sprout,
  3: leaf,
  4: twig,
  5: flower,
  6: fruit,
  7: tree,
  8: forest,
  9: mountain,
  10: god,
}

export default LEVEL_TO_IMG
