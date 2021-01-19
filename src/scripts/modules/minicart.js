const Element = require('./element');
const formatReal = require('./formatReal');

const Minicart = {
  init: ({ minicartClass, containerClass, OutterBox }) => {
    const $minicart = document.querySelector(minicartClass);

    $minicart.addEventListener('click', () => {
      Minicart.create({ containerClass, OutterBox });
    });
  },



  create: ({ containerClass, OutterBox }) => {



    const parentClass = containerClass ? containerClass : 'body';
    const $container = document.querySelector(parentClass);



    function removeCart(e) {
      if (e?.target.classList.contains('minicart__box')) {
        e.currentTarget.remove();
      }

      if (e?.target.classList.contains('button__keep-Buying')) {
        e.stopPropagation();
        let outterBox = document.getElementsByClassName('minicart__box')[0];
        outterBox.remove();
      }

      if (e?.target.classList.contains('minicart__close-top')) {
        e.currentTarget.remove();
      }
    }


    vtexjs.checkout.getOrderForm().done(function (orderForm) {
      
      
      const ordem = orderForm;
      console.log(ordem);

      const ordemTotal = orderForm.value;
      const itemList = orderForm.items;

      const elementCloseMiniCartTop = Element({
        elementType: 'span',
        classList: ['minicart__close-top'],
        text: 'x',
        onClick: () => {
          removeCart();
        }
      })

      const elementTitle = Element({
        elementType: 'h1',
        classList: ['minicart__title-top'],
        text: 'Meu Carrinho'
      })

      const minicartTop = Element({
        elementType: 'div',
        classList: ['minicart__top'],
        children: [elementCloseMiniCartTop, elementTitle]
      });

    
      const minicartMiddle = Element({
        elementType: 'ul',
        classList: ['minicart__middle'],
        children: itemList.map((product) =>
          Minicart.product({
            id: product.id,
            imageUrl: product.imageUrl,
            name: product.name,
            listPrice: product.listPrice,
            price: product.price,
          })
        ),
      });

      const elementSpanPrice = Element({
        elementType: 'span',
        classList: ['price-total__price'],
        text: `R$ ${formatReal(ordemTotal)}`,
      });

      const elementTotalPrice = Element({
        elementType: 'p',
        classList: ['bottom__price-total'],
        text: 'Total (Valor Sem Frete):',
        children: [elementSpanPrice],
      });

      const elementButtonMyBag = Element({
        elementType: 'button',
        classList: ['button__my-bag'],
        text: 'Ver minha Sacola',
        href: '/my-bag',
      });

      const elementButtonBuy = Element({
        elementType: 'button',
        classList: ['button__buy'],
        text: 'Fechar Pedido',
        href: '/checkout',
      });

      const elementButtonKeepBuying = Element({
        elementType: 'button',
        classList: ['button__keep-buying'],
        text: 'Continuar Comprando',
        onClick: (e) => {
          removeCart(e);
        },
      });

      const minicartBottom = Element({
        elementType: 'div',
        classList: ['minicart__bottom'],
        children: [elementTotalPrice, elementButtonMyBag, elementButtonBuy, elementButtonKeepBuying],
      });

      const container = Element({
        elementType: 'div',
        classList: ['minicart'],
        children: [minicartTop, minicartMiddle, minicartBottom],
      });

      const outterBoxMinicart = Element({
        elementType: 'div',
        classList: ['minicart__box'],
        children: [container],
        onClick: (e) => {
          removeCart(e);
        },
      });

      if (OutterBox) return $container.append(outterBoxMinicart);

      $container.append(container);

    });
  },

  product: ({ id, imageUrl, name, price, listPrice }) => {

    function removeItemMinicart(id) {

      vtexjs.checkout
        .getOrderForm()
        .then(function (orderForm) {

          orderForm.items.forEach((element, indice) => {

            if (element.id == id) {
              console.log(element, indice);

              var itemsToRemove = [
                {
                  index: indice,
                  quantity: 0,
                },
              ];
              return vtexjs.checkout.removeItems(itemsToRemove);
            }
          });
          
        })
        .done(function (orderForm) {

          alert('Item removido!');
          console.log(orderForm);

          let item = document.getElementById(id)
          item.parentNode.remove()

          vtexjs.checkout.getOrderForm().done(function (orderForm) {
            let priceTotal = document.getElementsByClassName('price-total__price')[0]
            priceTotal.textContent = `R$ ${formatReal(orderForm.value)}` 
          })
     
        });

    }


    const elementRemoveProduct = Element({
      elementType: 'span',
      classList: ['minicart__remove-product'],
      id: id,
      text: 'x',
      onClick: (e) => {
        const id = e.currentTarget.id;
        removeItemMinicart(id, e);
      },
    });

    const elementListPrice = Element({
      elementType: 'span',
      classList: ['minicart__list-price'],
      text: `R$ ${formatReal(listPrice)}`,
    });

    const elementPrice = Element({
      elementType: 'strong',
      classList: ['minicart__price'],
      text: `R$ ${formatReal(price)}`,
      children: [elementListPrice],
    });

    const elementProductName = Element({
      elementType: 'h4',
      classList: ['minicart__name'],
      text: name,
    });

    const elementRightWrapper = Element({
      elementType: 'div',
      classList: ['minicart__right__wrapper'],
      children: [elementProductName, elementPrice],
    });

    const elementProductImage = Element({
      elementType: 'img',
      classList: ['minicart__image'],
      src: imageUrl,
    });

    const container = Element({
      elementType: 'li',
      classList: ['minicart__product'],
      children: [elementRemoveProduct, elementProductImage, elementRightWrapper],
    });

    return container;
  },
};

module.exports = Minicart;
