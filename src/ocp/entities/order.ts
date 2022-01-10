import { orderStatus } from './interfaces/order-status';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: orderStatus = 'open'; //TODO

  constructor(
    private readonly cart: ShoppingCart,
    private readonly msg: Messaging,
    private readonly persistency: Persistency,
  ) {}

  get orderStatus(): orderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio!');
      return;
    }

    this._orderStatus = 'closed';
    this.msg.sendMessage('Seu pedido foi recebido!');
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
