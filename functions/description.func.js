export function describeTransaction(miniPayload, kind) {
  let statement;
  if (kind === 'Data') {

    statement = `Bought ${miniPayload.bundle.data} of ${miniPayload.network} Data for ${miniPayload.phone}.`;

  } else if (kind === 'Airtime') {

    statement = `Bought ₦${miniPayload.amount} ${miniPayload.network} ${kind} for ${miniPayload.phone}.`;

  } else if (kind === "Funding") {

    statement = ` Fund account with ₦${miniPayload.funds}.`;

  } else {
    throw new Error('Unknown Transaction')
  }
  return statement;
}