using System.Collections.Generic;
using System.Web;

namespace Planr.Tests
{
    internal class MockHttpSession : HttpSessionStateBase
    {
        private Dictionary<string, object> _sessionDictionary = new Dictionary<string, object>();

        public override object this[string name]
        {
            get {
                if (_sessionDictionary == null)
                    return null;
                
                object value = null;
                _sessionDictionary.TryGetValue(name, out value);
                return value;
            }
            set { _sessionDictionary[name] = value; }
        }

        public override void Abandon()
        {
            _sessionDictionary = null;
        }
    }
}
