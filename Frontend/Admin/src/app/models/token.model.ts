export class Token {
    _id: string;
    email: string;
    mobile: string;
    name: string;
    dateOfBirth: string;
    image: string;
    gender: string;
    country: string;
    collegeInfo?: string[] | null;
    ethereumAddress: string;
    degreeOfPlay: string;
    certificates: string;
    awardsAndAccolades: string;
    approved: boolean;
    amount: string;
    rate: string;
    tokenIndex: number;
  
    jsobObjectToToken(jsonObject: object): Token {
      const token: Token = new Token();
      token._id = jsonObject['_id'];
      token.email = jsonObject['email'];
      token.mobile = jsonObject['mobile'];
      token.name = jsonObject['name'];
      token.dateOfBirth = jsonObject['dateOfBirth'];
      token.image = jsonObject['image'];
      token.gender = jsonObject['gender'];
      token.country = jsonObject['country'];
      token.collegeInfo = jsonObject['collegeInfo'];
      token.ethereumAddress = jsonObject['ethereumAddress'];
      token.degreeOfPlay = jsonObject['degreeOfPlay'];
      token.certificates = jsonObject['certificates'];
      token.awardsAndAccolades = jsonObject['awardsAndAccolades'];
      token.approved = jsonObject['approved'];
      token.amount = jsonObject['amount'];
      token.rate = jsonObject['rate'];
      token.tokenIndex = jsonObject['tokenIndex'];
      return token;
    }
  }
  