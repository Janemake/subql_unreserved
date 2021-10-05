import {SubstrateEvent} from "@subql/types";
import {timestamp, eventId} from "./globalFunction";
import {Unreserved} from "../types/models";
import {Balance} from "@polkadot/types/interfaces";

export async function handleUnreserved(event: SubstrateEvent): Promise<void> {

    const {event: {data: [acountID, amount]}} = event;
    const address = acountID.toString();
    const amountBalance = (amount as Balance).toBigInt();
    const element = new Unreserved(eventId(event));

    element.timestamp = timestamp(event.block);
    element.unreservefrom = address;
    element.unreserveAmount = amountBalance;

    await element.save();
    logger.info('Unreserved from' + address);
}
