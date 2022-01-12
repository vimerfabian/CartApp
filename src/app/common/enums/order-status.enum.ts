/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
export enum OrderStatus {
  RECHAZADA = 0,
  PENDIENTE = 1,
  ACEPTADA = 2,
  EN_PROCESO = 3,
  ENVIADA = 4,
  ENTREGADO = 5,
}

export enum OrderStatusMessages {
  RECHAZADA = 'REJECTED',
  PENDIENTE = 'PENDING',
  ACEPTADA = 'ACCEPTED',
  EN_PROCESO = 'IN PROCESS',
  ENVIADA = 'SENT',
  ENTREGADO = 'DELIVERED',
}

export enum OrderStatusColor {
  RECHAZADA = '#7E7483',
  PENDIENTE = '#7E7483',
  ACEPTADA = '#DED600',
  EN_PROCESO = '#0FFC47',
  ENVIADA = '#0FFC47',
  ENTREGADO = '#0FFC47',
}

const _OrderStatusMessageLiteral = {};
_OrderStatusMessageLiteral[OrderStatus.RECHAZADA] =
  OrderStatusMessages.RECHAZADA;
_OrderStatusMessageLiteral[OrderStatus.PENDIENTE] =
  OrderStatusMessages.PENDIENTE;
_OrderStatusMessageLiteral[OrderStatus.ACEPTADA] = OrderStatusMessages.ACEPTADA;
_OrderStatusMessageLiteral[OrderStatus.EN_PROCESO] =
  OrderStatusMessages.EN_PROCESO;
_OrderStatusMessageLiteral[OrderStatus.ENVIADA] = OrderStatusMessages.ENVIADA;
_OrderStatusMessageLiteral[OrderStatus.ENTREGADO] =
  OrderStatusMessages.ENTREGADO;
export const OrderStatusMessageLiteral = _OrderStatusMessageLiteral;

const _OrderStatusColorLiteral = {};
_OrderStatusColorLiteral[OrderStatus.RECHAZADA] = OrderStatusColor.RECHAZADA;
_OrderStatusColorLiteral[OrderStatus.PENDIENTE] = OrderStatusColor.PENDIENTE;
_OrderStatusColorLiteral[OrderStatus.ACEPTADA] = OrderStatusColor.ACEPTADA;
_OrderStatusColorLiteral[OrderStatus.EN_PROCESO] = OrderStatusColor.EN_PROCESO;
_OrderStatusColorLiteral[OrderStatus.ENVIADA] = OrderStatusColor.ENVIADA;
_OrderStatusColorLiteral[OrderStatus.ENTREGADO] = OrderStatusColor.ENTREGADO;
export const OrderStatusColorLiteral = _OrderStatusColorLiteral;
